export class ImmutableCollectionHelper {
  public static insertItem(array, index: number, item: any): any[] {
    const newArray = array.slice();
    newArray.splice(index, 0, item);
    return newArray;
  }

  public static removeItem(array, index: number): any[] {
    return array.filter((item, idx) => idx !== index);
  }

  public static updateObjectInArray(array, index: number, item: any): any[] {
    return array.reduce(
      (acc, elm, i) => (i === index ? [...acc, { ...item, ...item }] : [...acc, item]),
      []
    );
  }
}
