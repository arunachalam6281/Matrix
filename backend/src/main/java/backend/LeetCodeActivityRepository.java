package backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeetCodeActivityRepository extends JpaRepository<LeetCodeActivity, Long> {
  boolean existsByEventTypeAndProblemNameAndEventTime(String eventType, String problemName, java.time.Instant eventTime);
}