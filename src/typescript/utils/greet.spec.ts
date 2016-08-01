import { sayHello } from './greet';
import {expect, it, describe} from "@angular/core/testing";

describe('Greet', () => {
    it('has says hello', () => {
        expect(sayHello("Frits")).toEqual("Hello from Frits");
    });
});