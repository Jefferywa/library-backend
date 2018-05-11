# Хранимые процедуры

Автор: Всеволод Голубинов  

## Хранимая процедура "bookItBook"
  CREATE DEFINER=`root`@`localhost` PROCEDURE `bookItBook`(IN id INT)
  BEGIN
	  update books set books.status = 1 where bid = id;
  END

## Хранимая процедура "getBooks"
  CREATE DEFINER=`root`@`localhost` PROCEDURE `getBooks`()
  BEGIN
	  SELECT * FROM books;
  END

## Хранимая процедура "signIn"
  CREATE DEFINER=`root`@`localhost` PROCEDURE `signin`(IN login VARCHAR(255), IN password VARCHAR(255))
  BEGIN
  	SELECT uid, login, password, status FROM `users` WHERE login = login && password = password;
  END
  
## Хранимая процедура "signUp"
  CREATE DEFINER=`root`@`localhost` PROCEDURE `signup`(IN login VARCHAR(255), IN password VARCHAR(255), IN firstname VARCHAR(45), IN    lastname VARCHAR(45))
  BEGIN
	  INSERT INTO `Users` (login, password, firstname, lastname) 
    VALUES (login, password, firstname, lastname);
  END
