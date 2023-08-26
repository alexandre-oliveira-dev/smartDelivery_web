
// funcao para extrair a key de um type, T = O type a funcao retorna a uma lista do nome das chaves em string.
export class NameOfFunction {
  nameof<T>(x: keyof T) {
    return x;
  }
}
