# Известные ошибки

- 2026-09-21: Подтверждённых ошибок проекта пока не зарегистрировано.
- 2026-09-22: Figma MCP сообщает об исчерпании лимита Starter. Не считать облачный файл готовым. Импортированные library node IDs не сохраняются между вызовами: повторно импортировать компонент по ключу. Облачная проверка также показала неверную высоту секций; требует исправления при восстановлении доступа.
- 2026-09-22: При продолжении переноса WordPress вызов site.list/content-authoring заблокирован automatic approval review из-за usage limit (Upgrade to Pro / purchase credits). Поэтому Astra не активирована, главная страница не создана, сайт не изменён после provisioning.
- 2026-09-22: Попытка создать Git-коммит с require_escalated отклонена automatic approval review из-за usage limit; действие не выполнено. Без remote URL и доступа к Git index невозможно отправить сайт в GitHub.
- 2026-09-22: GitHub connector write operations (create_blob) снова заблокированы usage limit automatic approval review. Read-only доступ работает, write в main пока невозможен.
- 2026-09-22: GitHub search/list не обнаружили репозиторий odnostranichiy-sait; connector permissions дают доступ только к antonova-oksana. Нельзя отправить файлы в неизвестный репозиторий.
- 2026-09-22: Попытка собрать ZIP через PowerShell заблокирована automatic approval review из-за лимита использования; комплект оставлен отдельными файлами.
- 2026-09-22: Пользователь сообщил, что ссылки на локальные файлы не работают на ноутбуке; использовать прямой путь к папке проекта через Проводник Windows.
- 2026-09-22: Запись в GitHub odnostranichiy-sait/main заблокирована automatic approval review по лимиту использования; read-only доступ работает, внешняя загрузка не выполнена.
