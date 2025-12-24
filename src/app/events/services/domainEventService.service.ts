import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { EntityType } from "../../resources/types/entityTypes.enum";

@Injectable({
  providedIn: "root"
})
export class DomainEventService {
  // Properties.
  private readonly eventSubjects: Map<EntityType, Subject<void>> = new Map<EntityType, Subject<void>>([
    [EntityType.Buy, new Subject<void>()],
    [EntityType.Customer, new Subject<void>()],
    [EntityType.Notification, new Subject<void>()],
    [EntityType.Organic, new Subject<void>()],
    [EntityType.Packaging, new Subject<void>()],
    [EntityType.Product, new Subject<void>()],
    [EntityType.Production, new Subject<void>()],
    [EntityType.Sale, new Subject<void>()],
    [EntityType.Supplier, new Subject<void>()],
    [EntityType.User, new Subject<void>()]
  ]);
  public readonly events$: Map<EntityType, Observable<void>> = new Map<EntityType, Observable<void>>(
    Array.from(this.eventSubjects.entries())
      .map(([key, subject]: [EntityType, Subject<void>]) => [key, subject.asObservable()])
  );

  // Methods.
  public emit(entityType: EntityType): void {
    const subject: Subject<void> | undefined = this.eventSubjects.get(entityType);

    if (!subject)
      return;

    subject.next();
  }

  public on(entityType: EntityType): Observable<void> | undefined {
    return this.events$.get(entityType);
  }
}
