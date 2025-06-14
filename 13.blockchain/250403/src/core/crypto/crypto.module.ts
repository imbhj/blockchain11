class CryptoModule {
    static hashToBinary(hash: string): string {
        // 64 / 2 = 32
        let binary: string = "";
        for(let i = 0; i < hash.length; i+=2){
            // i = i + 2
            const hexByte = hash.substr(i, 2);
            const dec = parseInt(hexByte, 16);
            const binaryByte = dec.toString(2).padStart(8, "0");
            binary += binaryByte;
        }
        return binary;
    }
}

export default CryptoModule
/*
    1. 입력값으로 해시 문자열 받아
    2. 해시 문자열 2글자씩 끊어
    3. 두 글자씩 끊는 이유는 16진수의 1바이트를 의미
    4. 지금은 각 바이트를 출력만

    왜 2글자씩 끊냐

    기본 개념부터

    16진수의 1자리(hex) => 4비트(바이너리)
    16진수의 2자리(hex) => 8비트(바이너리) => 1바이트 01000100

    "100000"

    100000000000000000000000000000000000000000000000000
*/