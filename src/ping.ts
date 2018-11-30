import {PingMsg, PongMsg} from "./messages"

interface Context {}

type Send<O> = (msg: O) => void

interface StatelessActor<I, O> {
    pattern: I
    onMessage: (msg: I, ctx: Context, send: Send<O>) => O | Promise<O> | void
    name: string
}

function spawnStateless<I, O>(actor: StatelessActor<I, O>): void {
    // TODO: wire inputs and outputs
}

// actors

const pinger: StatelessActor<PingMsg, PongMsg> = {
    pattern: {msg: "ping"},
    onMessage: (msg, ctx, send) => {
        setTimeout(() => send({msg: "pong"}), 1000)
    },
    name: "pinger"
}

const ponger: StatelessActor<PongMsg, PingMsg> = {
    pattern: {msg: "pong"},
    onMessage: () => ({msg: "ping"}),
    name: "ponger"
}

spawnStateless(pinger);
spawnStateless(ponger);