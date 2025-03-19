declare global {
    interface Window {
        ex: typeof import('excalibur');
    }
}

declare module 'excalibur' {
    export class Scene<T = unknown> {
        constructor();
        add(actor: Actor): void;
        emit(event: string, data: any): void;
        engine: Engine;
        _logger: any;
        events: any;
        camera: any;
        world: any;
        onActivate(): void;
        onDeactivate(): void;
        update(engine: Engine, delta: number): void;
        draw(ctx: CanvasRenderingContext2D, delta: number): void;
        initialize(engine: Engine): void;
        onPreUpdate(engine: Engine, delta: number): void;
        onPostUpdate(engine: Engine, delta: number): void;
        onPreDraw(ctx: CanvasRenderingContext2D, delta: number): void;
        onPostDraw(ctx: CanvasRenderingContext2D, delta: number): void;
        onTransition(direction: 'in' | 'out'): void;
        onTransitionComplete(direction: 'in' | 'out'): void;
        onPreKill(engine: Engine): void;
        onPostKill(engine: Engine): void;
        onPreCollisionResolve(self: Actor, other: Actor): void;
        onPostCollisionResolve(self: Actor, other: Actor): void;
        onCollisionStart(self: Actor, other: Actor): void;
        onCollisionEnd(self: Actor, other: Actor): void;
    }

    export class Engine {
        constructor(options: EngineOptions);
        addScene(name: string, scene: Scene | typeof Scene): void;
        goToScene(name: string): void;
        start(): void;
        stop(): void;
        input: Input;
    }

    export class Actor {
        constructor(options: ActorOptions);
        pos: Vector;
    }

    export class Vector {
        constructor(x: number, y: number);
    }

    export class Color {
        static Green: Color;
        static Red: Color;
        static Blue: Color;
        static Gray: Color;
        static Yellow: Color;
        static White: Color;
        static Black: Color;
        constructor(r: number, g: number, b: number);
    }

    export class Keys {
        static W: string;
        static S: string;
        static A: string;
        static D: string;
    }

    export class Input {
        keyboard: Keyboard;
    }

    export class Keyboard {
        on(event: string, callback: (event: KeyboardEvent) => void): void;
    }

    export interface EngineOptions {
        width: number;
        height: number;
        displayMode: DisplayMode;
        backgroundColor: Color;
        canvasElementId: string;
    }

    export interface ActorOptions {
        x: number;
        y: number;
        width: number;
        height: number;
        color: Color;
    }

    export enum DisplayMode {
        Fixed
    }

    export interface KeyboardEvent {
        key: string;
    }
}

export {}; 