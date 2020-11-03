export function scramble(input : string){

    const splittedInput : Array<string> = input.split(' ')
    const scrambledInput = splittedInput.map((splitPart : string) => randomString(splitPart.length));

    return scrambledInput.join(' ');
}


export function randomString(length: number){
    return Math.random().toString(36).substring(2,(length +2))
}