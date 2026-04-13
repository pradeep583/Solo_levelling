# Mock scheduler for now
class MockScheduler:
    def start(self):
        print("Scheduler started (mock)")
    def shutdown(self):
        print("Scheduler stopped")

scheduler = MockScheduler()
