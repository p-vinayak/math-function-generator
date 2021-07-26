export default abstract class MathFunction {
  protected abstract equations: string[];
  protected abstract subType: string | undefined;

  public getEquations() {
    return this.equations;
  }

  public getSubType() {
    return this.subType;
  }
}
