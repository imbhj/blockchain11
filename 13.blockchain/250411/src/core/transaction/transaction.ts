import { TxIn, TxOut, UnspentTxOut } from "@core/interface/transaction.interface";
import { SignatureInput } from "elliptic";
import { access } from "fs";

class Transaction {
    /*
        트랜잭션을 만들기 위한 입력값들을 생성

        받는 사람에게 보내기 위해 내가 가진 돈(UTXO) 중에서
        보낼 금액만큼 꺼내서
        트랜잭션 입력(TxIn)으로 만들어주는 역할

        그래서 매개변수는 다음과 같다

        myUnspentTxOuts: UnspentTxOut[] // 내가 가지고 있는 UTXO들
        receiptAmount: number : 보내고자 하는 목표 금액
        signature: SignatureInput // 나의 서명

        결과 : [TxIn 목록, 총액]
    */
    createInput(
        myUnspentTxOuts: UnspentTxOut[],
        receiptAmount: number,
        signature: SignatureInput
    ): [TxIn[], number] {
        // 먼저 동전 짤짤이 다 꺼내볼거임 => 목표한, 필요한 만큼
        // 지금까지 꺼낸 UTXO들의 총 누적 값
        // reduce로 값을 계속 더할건데, 위의 매개변수 receiptAmount보다 크거나 같을 때까지 동전을 꺼낼거임
        let targetAmount = 0;
        const txins = myUnspentTxOuts.reduce((acc:TxIn[], UnspentTxOut: UnspentTxOut) => {
            const { amount, txOutId, txOutIndex } = UnspentTxOut;
            // 목표 금액만큼 모았으면 더 이상 꺼낼 필요가 없음
            if (targetAmount >= receiptAmount) return acc;
            // 목표 금액만큼 안모였다면, 미사용 객체의 금액들을 계속 더한다.
            // ?? 0 => 만약 undefined다 => 0으로 취급하고 0을 더하겠다.
            targetAmount += amount ?? 0; 
            acc.push({ txOutIndex, txOutId, signature})
            return acc;
        }, [])
        return [txins, targetAmount];
        /*
            [
                [
                    {txOutIndex: 0, txOutId: "001", signature : {r, s, v, G포인트}}
                    {txOutIndex: 1, txOutId: "002", signature : {r, s, v, G포인트}}
                ],
                7
            ]
        */
    }
    // 마! 실수할수도 있지!
    createOutInput (
        received: string, // 받는 사람 주소
        amount: number, // 실제 보낼 금액 => 7
        sender: string, // 보내는 사람 주소
        senderAmount: number // 보내는 사람이 실제로 꺼낸 돈 => 10
    ): TxOut[] {
        const txouts: TxOut[] = [];
        // 받을 사람에게 요청한 금액만큼 TxOut을 하나 만들어 배열에 넣음.

        // [{received: "앨리스주소", amount: 7}]
        txouts.push({ account: received, amount});
        // senderAmount: 100 amount: 50 
        if (senderAmount - amount > 0) {
            // 거스름돈 주기
            // {account: Bob, amount: 3}
            txouts.push({account: sender, amount: senderAmount - amount});
        }

        // 총 금액 검증
        // 돈이 새로 생기거나 사라지면 절대 안되기 때문에, 다시 한 번 세본다.

        /*
            txouts = [
                {
                    account: "앨리스주소",
                    amount: 7
                },
                {
                    account: "밥주소",
                    amount: 3
                }
            ]
        */
       const outAmount = txouts.reduce((acc, cur) => acc + cur.amount, 0);
       // 실제로 혜성님이 꺼낸 금액 100과 거스름돈까지 준거 다시 계산 => 비교
       if(outAmount !== senderAmount) throw new Error("총 금액이 맞지 않음!");
       return txouts;
    }
}

export default Transaction