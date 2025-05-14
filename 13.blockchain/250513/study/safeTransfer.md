# ERC721

## `_transfer()`

### 설명

`_transfer()`는 **내부 함수(internal)**로서 **NFT의 소유권을 이전**하는 핵심 로직
단, 이 함수는 **승인 권한 체크를 하지 않으며** 안전 전송도 보장하지 않음

```solidity
    function _transfer(address from, address to, uint256 tokenId) internal {
        if (to == address(0)) {
            revert ERC721InvalidReceiver(address(0));
        }
        address previousOwner = _update(to, tokenId, address(0));
        if (previousOwner == address(0)) {
            revert ERC721NonexistentToken(tokenId);
        } else if (previousOwner != from) {
            revert ERC721IncorrectOwner(from, tokenId, previousOwner);
        }
    }
```

### 내부 동작

to가 address(0)이면 에러 발생 (소각 불가)

`_update()` 호출로 소유자 정보, 밸런스 변경 및 이벤트 전송 처리

`_update()`는 승인 초기화와 `Transfer` 이벤트를 포함

### 주의사항

권한 검사를 하지 않음

컨트랙트 수신자에 대한 ERC721 수신 여부 확인하지 않음

---

## `safeTransferFrom()`

### 설명

`safeTransferFrom()`은 외부에서 호출 가능한 공식 ERC721 안전 전송 함수
`_transfer()`와 달리 컨트랙트 수신자에 대해 ERC721 수신 가능 여부를 검증

```solidity
    // 내부적으로 빈 data("")를 넘김
    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId, "");
    }

    // 외부에서 data 지정 가능
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual {
        transferFrom(from, to, tokenId);
        ERC721Utils.checkOnERC721Received(_msgSender(), from, to, tokenId, data);
    }
```

### 내부 동작

`transferFrom()`을 호출하여 소유권 이동

ERC721Utils.checkOnERC721Received() 호출로 수신자 검증

data는 추가 정보로 인터페이스 함수에 전달 가능

---

## `_safeTransfer()`

### 설명

`_safeTransfer()`는 내부 함수로서 `_transfer()`를 호출하면서 컨트랙트 수신자 체크를 추가함
보통 signature, meta transaction 같은 확장 기능을 구현할 때 사용

```solidity
    // data 없이 전송
    function _safeTransfer(address from, address to, uint256 tokenId) internal {
        _safeTransfer(from, to, tokenId, "");
    }

    // data와 함께 전송
    function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal virtual {
        _transfer(from, to, tokenId);
        ERC721Utils.checkOnERC721Received(_msgSender(), from, to, tokenId, data);
    }
```

### 내부 동작

`_transfer()` 호출하여 권한 없는 전송 수행

이후 ERC721Utils.checkOnERC721Received(...) 호출로 수신자 검증

`_msgSender()`가 호출 주체로 전달됨

---

## 질문

### Q. `safeTransferFrom()` vs `_safeTransfer()`

#### A.

| 항목        | `_safeTransfer`                       | `safeTransferFrom`           |
| ----------- | ------------------------------------- | ---------------------------- |
| 접근제한자  | `internal`                            | `public`                     |
| 권한 확인   | ❌ 수동으로 구현 필요                 | ✅ 자동 수행                 |
| 사용 목적   | 컨트랙트 내부 로직                    | 외부 호출 (사용자나 DApp 등) |
| 수신자 검증 | ✅ `onERC721Received()` 체크          | ✅ 동일                      |
| 전송자      | 보통 컨트랙트 (proxy, marketplace 등) | 외부 사용자 또는 컨트랙트    |

### Q. 왜 `_safeTransfer()` 내부 로직 순서는 `transfer()` => 수신자 검증 ?? 수신자 검증 먼저 해야하는거 아님?

#### A1. ERC-721 표준의 공식적인 흐름

EIP-721 공식 스펙 규정:

> The Transfer event is emitted before calling onERC721Received, so that the receiver contract can verify it owns the token inside its onERC721Received implementation.

=> 수신자 컨트랙트 입장에서는 onERC721Received를 호출받을 때 이미 token을 소유하고 있어야 한다는 전제

#### A2. 컨트랙트 수신자 내부 로직을 위한 설계

컨트랙트 수신자가 `onERC721Received()` 안에서:

```solidity
function onERC721Received(...) external returns (bytes4) {
// 여기서 ownerOf(tokenId) 호출 가능해야 함
}
```

즉, 이 시점에 `ownerOf(tokenId)`가 자기 자신을 반환해야 그 NFT를 관리하거나 검증할 수 있음.
그걸 가능하게 하려면 먼저 `_transfer()`로 소유권을 이전하고 나서 검증을 해야 함

❗ 그런데, 검증 실패 시 소유권은?

Solidity에서 어떤 단계에서든 revert()가 발생하면 그 이전 상태로 **모든 스토리지 변경이 롤백됨**

=> `_transfer()`가 일시적으로 소유권을 변경하더라도 `ERC721Utils.checkOnERC721Received(...)`에서 실패하면 소유권도 되돌아감

#### A3.

| 단계 | 함수                                     | 설명                                                |
| ---- | ---------------------------------------- | --------------------------------------------------- |
| 1️⃣   | `_transfer(...)`                         | 소유권 이전 (스토리지 변경 발생)                    |
| 2️⃣   | `ERC721Utils.checkOnERC721Received(...)` | 수신자가 컨트랙트일 경우 ERC721 수신 가능 여부 체크 |
| 3️⃣   | 실패 시 `revert()`                       | 전체 트랜잭션 롤백: 소유권도 복구됨                 |

### Q. `ERC721Utils.checkOnERC721Received()`는 어떤 검사를 함?

### A.

이 함수는 딱 하나의 역할을 함:

to가 컨트랙트일 경우 `onERC721Received()` 함수를 제대로 구현했는지 검사

```solidity
bytes4 retval = IERC721Receiver(to).onERC721Received(...);
require(retval == IERC721Receiver.onERC721Received.selector, "ERC721: transfer to non ERC721Receiver implementer");
```

=> 이 검증은 **"받는 쪽이 ERC721을 받을 준비가 돼 있는가?"**만 확인

### Q. ?? 그럼 주소랑 토큰 유효성 검사는 누가함?

#### A.

| 항목                  | 실제 검증 위치                                                 | 설명                                                                                                               |
| --------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **1. `from` 검증**    | ✅ `transferFrom()` 또는 `_update()` 내부에서 수행             | - `_msgSender()`가 owner인지, <br> 또는 approved인지 확인됨 (`_checkAuthorized`) <br> - `_balances[from]`도 관리됨 |
| **2. `to` 검증**      | ✅ `transferFrom()`, `_transfer()`, `_safeTransfer()`에서 수행 | - `to == address(0)`이면 `revert` <br> - 컨트랙트면 `checkOnERC721Received` 호출                                   |
| **3. `tokenId` 검증** | ✅ `_requireOwned(tokenId)`에서 수행                           | - 존재하지 않는 tokenId면 `revert` <br> - 소유자와 from이 다르면 `ERC721IncorrectOwner` 발생                       |
| **4. `data` 검증**    | ❌ OpenZeppelin 기본 구현에서는 따로 검증하지 않음             | - 단순히 `onERC721Received()`로 전달됨 <br> - **컨트랙트 수신자**가 이 값을 자유롭게 해석 가능                     |
