interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string; // contains the HTML
  variables: ITemplateVariables; // object
}
