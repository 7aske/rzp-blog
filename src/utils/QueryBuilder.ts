class CriteriaOperation {
  public static EQ = ":";
  public static GT = ">";
  public static LT = "<";
  public static NE = "!";
  public static LIKE = "~";
  public static WILDCARD = "*";
  public static NULL = "null";
  public static NOT_NULL = "notnull";
}

class SearchCriteria {
  private readonly firstOperand: string = "";
  private readonly secondOperand: string = "";
  private readonly operation: CriteriaOperation;
  private readonly isOr: boolean = false;


  constructor(firstOperand: string, secondOperand: string, operation: CriteriaOperation, isOr = false) {
    this.firstOperand = firstOperand;
    this.secondOperand = secondOperand;
    this.operation = operation;
    this.isOr = isOr;
  }

  public get chainOp(): string {
    return this.isOr ? "OR" : "AND";
  }

  public toString(): string {
    return ` ${this.chainOp} ${this.firstOperand}${this.operation}${this.secondOperand}`;
  }

}

export class QueryBuilder {
  private readonly criteriaList: any[] = [];
  private isBuilderOr = false;
  private isCriteriaOr = true;
  private of = "";

  public constructor() {
  }

  public static of(of: string) {
    const builder = new QueryBuilder();
    builder.of = of;
    return builder;
  }

  public and(): QueryBuilder {
    this.isCriteriaOr = false;
    return this;
  }

  public or(): QueryBuilder {
    this.isCriteriaOr = true;
    return this;
  }

  public eq(operand1: string, operand2: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.EQ, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public gt(operand1: string, operand2: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.GT, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public lt(operand1: string, operand2: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.LT, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public ne(operand1: string, operand2: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2, CriteriaOperation.NE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public like(operand1: string, operand2: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.WILDCARD + operand2 + CriteriaOperation.WILDCARD, CriteriaOperation.LIKE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public startsWith(operand1: string, operand2: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.WILDCARD + operand2, CriteriaOperation.LIKE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public endsWith(operand1: string, operand2: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, operand2 + CriteriaOperation.WILDCARD, CriteriaOperation.LIKE, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public null(operand1: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.NULL, CriteriaOperation.EQ, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public notNull(operand1: string): QueryBuilder {
    this.criteriaList.push(new SearchCriteria(operand1, CriteriaOperation.NOT_NULL, CriteriaOperation.EQ, this.isCriteriaOr));
    this.isCriteriaOr = false;
    return this;
  }

  public criteria(cb: (builder: QueryBuilder) => QueryBuilder) {
    const builder = new QueryBuilder();
    builder.isBuilderOr = this.isCriteriaOr;
    this.criteriaList.push(cb(builder));
    return this;
  }

  public toString(): string {
    return ` ${this.isBuilderOr ? "OR" : "AND"} ${this.build()}`;
  }

  public build(): string {
    return "( " + this.criteriaList.map(criteria => criteria.toString()).join("")
      .replace(/^\s\w{2,3}\s/, "") + " )";
  }

  public buildUrlEncoded(): string {
    if (this.of) {
      return `/${this.of}?q=${encodeURIComponent(this.build())}`;
    }
    return encodeURIComponent(this.build());
  }

}

// const query = CriteriaBuilder.of("users")
//   .eq("test", "test1")
//   .or()
//   .gt("test2", "test3")
//   .and()
//   .null("test3")
//   .or()
//   .criteria(builder =>
//     builder.like("test4", "test5")
//       .or()
//       .endsWith("test6", "test7")
//       .criteria(builder1 =>
//         builder1.eq("test22", "test33")));
//
//
// console.log(query.build()); // ( test:test1 OR test2:test3 AND test3:null OR ( test4~*test5* OR test6~test7* ) )
// console.log(query.buildUrlEncoded()); // (%20test%3Atest1%20OR%20test2%3Atest3%20AND%20test3%3Anull%20OR%20(%20test4~*test5*%20OR%20test6~test7*%20)%20)

