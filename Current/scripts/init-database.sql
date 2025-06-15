-- Инициализация базы данных для проекта Current
-- Создание таблиц и тестовых данных

-- Создание таблицы проектов
CREATE TABLE IF NOT EXISTS Projects (
                                        ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                        Name TEXT NOT NULL
);

-- Создание таблицы сотрудников
CREATE TABLE IF NOT EXISTS Employees (
                                         ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                         FirstName TEXT NOT NULL,
                                         SecondName TEXT,
                                         LastName TEXT NOT NULL
);

-- Создание таблицы документов
CREATE TABLE IF NOT EXISTS Documents (
                                         ID INTEGER PRIMARY KEY AUTOINCREMENT,
                                         DateCreated DATE NOT NULL,
                                         Type TEXT NOT NULL CHECK (Type IN ('Estimate', 'Contract')),
    ResponsibleEmployee INTEGER NOT NULL,
    Project INTEGER NOT NULL,
    FOREIGN KEY (ResponsibleEmployee) REFERENCES Employees(ID),
    FOREIGN KEY (Project) REFERENCES Projects(ID)
    );

-- Вставка тестовых проектов
INSERT OR REPLACE INTO Projects (ID, Name) VALUES
(1, 'Проект Alpha'),
(2, 'Проект Beta'),
(3, 'Проект Gamma');

-- Вставка тестовых сотрудников
INSERT OR REPLACE INTO Employees (ID, FirstName, SecondName, LastName) VALUES
(1, 'John', 'Michael', 'Doe'),
(2, 'Jane', 'Elizabeth', 'Smith'),
(3, 'Sam', 'Alexander', 'Brown');

-- Вставка тестовых документов
INSERT OR REPLACE INTO Documents (Type, DateCreated, ResponsibleEmployee, Project) VALUES
-- Январь 2025
('Estimate', '2025-01-15', 1, 1),
('Contract', '2025-01-25', 1, 1),
('Estimate', '2025-01-28', 2, 2),
('Estimate', '2025-01-30', 2, 2),

-- Февраль 2025
('Contract', '2025-02-05', 2, 2),
('Estimate', '2025-02-10', 3, 3),
('Contract', '2025-02-15', 3, 3),

-- Март 2025
('Estimate', '2025-03-01', 1, 1),
('Contract', '2025-03-10', 1, 1);