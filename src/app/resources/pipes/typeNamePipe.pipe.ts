import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "typeName",
  pure: true
})
export class TypeNamePipe implements PipeTransform {
  public transform<T extends string | number>(value: T, labels: Record<T, string>): string {
    return labels[value];
  }
}
