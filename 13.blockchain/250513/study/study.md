# 실습 **“전부 판매하려고 내놓고 싶어요” – `setApprovalForAll()` 확장 실습**

## 목표

**기존 `approve(tokenId)` 구조는 유지한 채**,
`setApprovalForAll()`을 활용한 **추가 기능** 구현

## 미션

### 1. 화면에 버튼 생성:

```tsx
<button onClick={approveAllTokens}>전부 판매하려고 내놓기</button>
```

### 2. 버튼 클릭 시 단 한 번의 서명으로 전부 권한을 위임

=> 이걸 함수로 구현하라는 뜻.  
=> 함수 이름 => approveAllTokens

---

## 3. 이후 내가 가진 모든 NFT는

별도로 `approve(tokenId)`를 누르지 않아도
→ 바로 `purchase(tokenId)`가 가능한 상태여야 함

### 조건 제한

- 기존 코드(`approve(tokenId)` 버튼)는 절대 수정 ㄴㄴ
- 단지 **버튼 하나를 새로 추가**해서
  → 전체 판매 가능 상태로 전환하는 개념을 체화하는 것이 핵심
- 이 기능은 “대체가 아닌 추가 확장”으로 접근해야 함

## 스스로에게 던질 질문

### 1. 기존 approve 방식은 왜 불편했는가?

: 토큰 하나씩 직접 호출해야해서 귀찮음

### 2. `setApprovalForAll()`은 어떤 연산을 내부적으로 해결해주는가?

내 소유의 모든 NFT를 trnasfer 가능도록 operator에게 권한을 부여함

```solidity ERC721.sol
    // _operatorApprovals[owner][operator] = true  =>  operator는 owner의 모든 NFT를 trnasfer할 권한이 있음-!
    mapping(address owner => mapping(address operator => bool)) private _operatorApprovals;

    // operator(권한 위임받을 대상), approved(true:권한 부여, false:권한 철회), msg.sender(owner)
    function setApprovalForAll(address operator, bool approved) public virtual {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function _setApprovalForAll(address owner, address operator, bool approved) internal virtual {
        if (operator == address(0)) {
            revert ERC721InvalidOperator(operator);
        }
        _operatorApprovals[owner][operator] = approved; // 이 값을 기반으로 권한 여부 판단, true=권한부여 false=권한철회
        emit ApprovalForAll(owner, operator, approved); // event 발생시켜 블록체인에 기록 남김, 프론트에서 UI 업데이트 가능
    }
```

```solidity IERC721.sol
    // event 발생 시 프론트에서 확인 가능함
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
```

#### 내부 동작

Alice가 Bob에게 본인 소유 모둔 NFT 권한 넘길 것-!

1. Alice가 `setApprovalForAll(Bob, true)` 호출
2. `setApprovalForAll(Bob, true)` 내부에서 `_setApprovalForAll(Alice, Bob, true)` 호출됨
3. `_setApprovalForAll(Alice, Bob, true)` 실행
   3-1. Bob주소 검사
   3-2. mapping 저장, `_operatorApprovals[Alice][Bob] = true`
   3-3. mapping 결과 true => Bob은 Alice의 모든 NFT를 transfer할 권한 획득
   3-4. 이벤트 발생 `ApprovalForAll(Alice, Bob, true)`, 블록체인 상 기록이 남게 되며 UI로 결과 업데이트 가능함
4. Bob은 Alice 소유의 모든 NFT에 대한 권한을 갖게 됨

### 3. operator(두 번째 인자)는 누구여야 하는가?

- operator : 권한을 위임받을 CA

=> Baseball NFT Game CA가 되어야 함
구매자가 정해지지 않은 시점이기 때문에 특정 CA에게 넘길 수 없음!
누가 구매할 줄 알고,,?
우선 Baseball NFT Game CA한테 권한 위임한 후 NFT 구매를 원하는 CA가 나타났을 때 Baseball NFT Game CA가 위임받은 권한으로 구매자 CA에게 NFT를 넘겨줌

### 4. UX 관점에서 이 기능이 어떤 실질적 개선을 주는가?

: 사용자 편의성을 더해줌
10번 클릭해서 토큰 판매할거 1번만 클릭하면 됨

## 추가 미션 (선택 과제)

- 사용자가 이미 `setApprovalForAll()`을 호출했는지를 확인하고
  → 버튼 문구를 `"이미 전부 내놓았습니다"`로 바꾸도록 로직을 추가해보세요.

```tsx
const isApproved = await baseballNftTokenContract.methods
  .isApprovedForAll(account, baseballNftTokenAddress)
  .call();
```

### `isApprovedForAll()`

owner가 operator에게 모든 NFT에 대한 전송 권한을 위임했는지 여부를 true, false로 반환함

```solidity
    function isApprovedForAll(address owner, address operator) public view virtual returns (bool) {
        return _operatorApprovals[owner][operator];
    }
```

## ISSUE

`setApprovalForAll()`로 모든 NFT의 권한 넘기기는 성공, 근데 구매가 안됨,,
개별로 판매 등록 후 구매했을 시에는 정상적으로 작동

=> BaseballNFT.sol의 `putchase()` 수정
`isApprovedForAll()` 추가함

```solidity
    function purchase(uint256 tokenId) public payable {
        require(minted[tokenId], "Token does not exist");

        address currentOwner = ownerOf(tokenId);
        require(currentOwner != msg.sender, "You Already Own this token");

        require(getApproved(tokenId) == address(this) || isApprovedForAll(currentOwner, address(this)), "Contract not approved for transfer");
        require(msg.value == 1 ether, "Price is 1 ether");

        // 이더 전송
        payable(currentOwner).transfer(msg.value);

        // 컨트랙트가 대신 소유권 이전함
        // from, to, tokenId
        _transfer(currentOwner, msg.sender, tokenId);
    }
```
