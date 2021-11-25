import {AccountId, msg, Event} from "ask-lang";

@event
class Flip extends Event {
    @topic from: AccountId;
    flip_result: bool;

    constructor(from: AccountId, flip_result: bool) {
        super();
        this.from = from;
        this.flip_result = flip_result;
    }
}

@contract
class Flipper {
    @state flag: bool;

    constructor(){
    }

    @constructor
    default(initFlag: bool): void {
        this.flag = initFlag;
    }

    @message
    flip(): void {
        const v = this.flag;
        this.flag = !v;
        (new Flip(msg.sender, this.flag)).emit();
    }

    @message({"mutates": false})
    get(): bool {
        return this.flag;
    }
}
