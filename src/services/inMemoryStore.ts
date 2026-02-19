import { CostInput, EventInput, VolumeInput } from "../utils/types";

class InMemoryStore {
  private readonly costs: CostInput[] = [];
  private readonly volumes = new Map<string, number>();
  private readonly events: EventInput[] = [];

  addCost(payload: CostInput): CostInput {
    this.costs.push(payload);
    return payload;
  }

  addVolume(payload: VolumeInput): VolumeInput {
    this.volumes.set(payload.periodo, payload.volume);
    return payload;
  }

  addEvent(payload: EventInput): EventInput {
    this.events.push(payload);
    return payload;
  }

  getCosts(): CostInput[] {
    return [...this.costs];
  }

  getVolumes(): Map<string, number> {
    return new Map(this.volumes);
  }

  getEvents(): EventInput[] {
    return [...this.events];
  }
}

const inMemoryStore = new InMemoryStore();

export { inMemoryStore };
