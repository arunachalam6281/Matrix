package backend;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

  private final TodoRepository repo;

  public TodoController(TodoRepository repo) {
    this.repo = repo;
  }

  @GetMapping
  public List<TODO> getAll() {
    return repo.findAll();
  }

  @PostMapping
  public TODO create(@RequestBody TODO todo) {
    return repo.save(todo);
  }

  @PutMapping("/{id}")
  public TODO update(@PathVariable Long id, @RequestBody TODO todo) {
    TODO existing = repo.findById(id).orElseThrow();
    existing.setTitle(todo.getTitle());
    existing.setCategory(todo.getCategory());
    existing.setDueDate(todo.getDueDate());
    existing.setCompleted(todo.isCompleted());
    return repo.save(existing);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    repo.deleteById(id);
  }
}