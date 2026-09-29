export type ToastType = "ok" | "err";
type Listener = (msg: string, type: ToastType) => void;

/** Bus phát thông báo — mọi module đều emit được, ToastHost subscribe để hiển thị */
class ToastBusImpl {
  private readonly listeners = new Set<Listener>();

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  emit(msg: string, type: ToastType = "ok"): void {
    this.listeners.forEach((f) => f(msg, type));
  }
}

export const ToastBus = new ToastBusImpl();