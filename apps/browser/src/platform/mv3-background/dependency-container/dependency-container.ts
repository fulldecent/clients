import "reflect-metadata";
import { DependencyConstructor } from "./dependency-container.abstractions";

class DependencyContainer {
  static instances = new Map<DependencyConstructor<any>, any>();
  static factories = new Map<DependencyConstructor<any>, () => any>();

  static register<T>(target: DependencyConstructor<T>, factory: () => T) {
    if (DependencyContainer.factories.has(target)) {
      return;
    }
    DependencyContainer.factories.set(target, factory);
  }

  static resolve<T>(target: DependencyConstructor<T>): T {
    if (DependencyContainer.instances.has(target)) {
      return DependencyContainer.instances.get(target);
    }

    if (!DependencyContainer.factories.has(target)) {
      throw new Error(`No factory registered for ${target.name}`);
    }

    DependencyContainer.instances.set(target, DependencyContainer.factories.get(target)!());
    return DependencyContainer.instances.get(target);
  }
}

export default DependencyContainer;