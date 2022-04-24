# GitLog

Репозиторий для ресурса [gitlog](https://gitlog.ru).

Вы можете добавить информацию о своем OpenSource проекте с помощью Pull Request, добавив информацию о нем в projects.json

Пример объекта проекта:

```json
{
  "title": "Naris",
  "description": "Информационная платформа для саморазвития, которая помогает прокачать навыки планирования, задать интересующие вопросы и получить на них ответы. Платформа позволяет создавать как публичные, так и закрытые (платные) материалы.",
  "technologies": ["TypeScript", "Angular", "NestJS", "SQLite"],
  "labels": ["Contribute", "MVP", "POC"],
  "links": [
    {
      "name": "Web",
      "url": "https://soer.pro"
    },
    {
      "name": "GitHub",
      "icon": "fa-brands fa-github",
      "url": "https://github.com/soerdev/soer"
    }
  ]
}
```

- Поле description может содержать HTML теги для дополнительного форматирования
- Поле icon содержит классы иконок [fontawesome](https://fontawesome.com/icons)
