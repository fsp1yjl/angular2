import { sayHello } from './greet';

describe('Greet', () => {
    it('has says hello', () => {
        expect(sayHello("Frits")).toEqual("Hello from Frits");
    });
});