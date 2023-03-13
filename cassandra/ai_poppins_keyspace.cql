CREATE KEYSPACE ai_poppins_keyspace WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE ai_poppins_keyspace;
CREATE TABLE task (
  id int,
  name varchar,
  description varchar,
  category_id int,
  start_date timestamp,
  due_date timestamp,
  priority int,
  repeating_type int,
  PRIMARY KEY (id)
);
CREATE INDEX task_name ON task (id, name);
CREATE TABLE category (
  id int,
  name varchar,
  PRIMARY KEY (id)
);
CREATE INDEX category_name ON category (name);
CREATE TABLE taskdata (
  id int,
  task_id int,
  data_type varchar,
  data_value map<text, text>,
  PRIMARY KEY (id)
);
CREATE TABLE repeating_type (
  id int,
  name varchar,
  PRIMARY KEY (id)
);
ALTER TABLE task ADD category_name varchar;
ALTER TABLE task ADD repeating_type_name varchar;
CREATE INDEX task_category_name ON task (category_name);
CREATE INDEX task_repeating_type_name ON task (repeating_type_name);
ALTER TABLE taskdata ADD task_name varchar;
ALTER TABLE taskdata ADD task_category_name varchar;
ALTER TABLE taskdata ADD repeating_type_name varchar;
CREATE INDEX taskdata_task_name ON taskdata (task_name);
CREATE INDEX taskdata_task_category_name ON taskdata (task_category_name);
CREATE INDEX taskdata_repeating_type_name ON taskdata (repeating_type_name);
ALTER TABLE task ADD FOREIGN KEY (category_id) REFERENCES category (id);
ALTER TABLE taskdata ADD FOREIGN KEY (task_id) REFERENCES task (id);
ALTER TABLE task ADD FOREIGN KEY (repeating_type) REFERENCES repeating_type (id);

