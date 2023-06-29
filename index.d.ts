declare module "locastore" {
  export default class Locastore {
    constructor(namespace?: string);
    get(key: string): any;
    set(key: string, value: any);
    delete(key: string);
    clear();
    static clear();
  }
}
