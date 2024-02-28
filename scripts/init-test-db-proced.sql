DELIMITER //

CREATE PROCEDURE deleteAllRowsInDatabaseTables()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE tableName VARCHAR(255);
  DECLARE cursorTables CURSOR FOR
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'starterdb'
      AND table_type = 'BASE TABLE';

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cursorTables;

  read_loop: LOOP
    FETCH cursorTables INTO tableName;
    IF done THEN
      LEAVE read_loop;
    END IF;

    SET @sql = CONCAT('DELETE FROM `', tableName, '`;');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END LOOP;

  CLOSE cursorTables;
END//

DELIMITER ;