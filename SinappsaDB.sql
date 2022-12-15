CREATE TABLE REGISTERED
(
  userID SERIAL PRIMARY KEY,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  userName VARCHAR NOT NULL,
  userAvatar VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  created DATE,
  UNIQUE (userName),
  UNIQUE (email)
);

CREATE TABLE MODERATOR
(
  userID INT NOT NULL,
  PRIMARY KEY (userID),
  FOREIGN KEY (userID) REFERENCES REGISTERED(userID)
);

CREATE TABLE STUDY_PROGRAMME
(
  programmeID SERIAL PRIMARY KEY,
  programeName VARCHAR(100) NOT NULL

);

CREATE TABLE COURSE
(
  courseID SERIAL PRIMARY KEY,
  courseName VARCHAR(100) NOT NULL,
  abbreviationCourse VARCHAR(100) NOT NULL,
  programmeID INT NOT NULL,
  FOREIGN KEY (programmeID) REFERENCES STUDY_PROGRAMME(programmeID)
);

CREATE TABLE CATEGORY
(
  categoryID SERIAL PRIMARY KEY,
  categoryName VARCHAR(100) NOT NULL,
  courseID INT NOT NULL,
  FOREIGN KEY (courseID) REFERENCES COURSE(courseID)
);

CREATE TABLE POST
(
  postID SERIAL PRIMARY KEY,
  postTitle VARCHAR(100) NOT NULL,
  postDescription VARCHAR(1000) NOT NULL,
  timeOfCreation DATE NOT NULL,
  typeOfPost VARCHAR(100) NOT NULL,
  creatorUserID INT NOT NULL,
  categoryID INT NOT NULL,
  FOREIGN KEY (creatorUserID) REFERENCES REGISTERED(userID),
  FOREIGN KEY (categoryID) REFERENCES CATEGORY(categoryID)
);

CREATE TABLE REPLIES
(
  replyID SERIAL PRIMARY KEY,
  replyText VARCHAR(1000) NOT NULL,
  replyCreated DATE NOT NULL,
  statusValue VARCHAR NOT NULL,
  replyCreatorID INT NOT NULL,
  postID INT NOT NULL,
  FOREIGN KEY (replyCreatorID) REFERENCES REGISTERED(userID),
  FOREIGN KEY (postID) REFERENCES POST(postID) ON DELETE CASCADE
);

CREATE TABLE DELETEDPOST
(
  explanation VARCHAR(1000) NOT NULL,
  deletorUserID INT NOT NULL,
  postID INT NOT NULL,
  PRIMARY KEY (postID),
  FOREIGN KEY (deletorUserID) REFERENCES MODERATOR(userID),
  FOREIGN KEY (postID) REFERENCES POST(postID)
);

CREATE TABLE GRADE
(
  grade INT NOT NULL,
  instructorID INT NOT NULL,
  learnerID INT NOT NULL,
  postID INT NOT NULL,
  PRIMARY KEY (instructorID, learnerID, postID),
  FOREIGN KEY (instructorID) REFERENCES REGISTERED(userID),
  FOREIGN KEY (learnerID) REFERENCES REGISTERED(userID),
  FOREIGN KEY (postID) REFERENCES POST(postID)
);

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Ivo', 'Ivić', 'Ivek', 'Slikica1', '1234','ii1234@fer.hr','1.1.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Pero', 'Perić', 'Perke', 'Slikica2', '1234','pp1234@fer.hr','1.1.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Željko', 'Šerman', 'Šeki', 'Slikica3', '1234','žš1234@fer.hr','15.12.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Jana', 'Šinka', 'Šunka', 'Slikica4', '1234','jš1234@fer.hr','13.12.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Milan', 'Stanković', 'Miki', 'Slikica5', '1234','ms1234@fer.hr','13.12.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Šaša', 'Milinković', 'Sale', 'Slikica6', '1234','šm1234@fer.hr','1.12.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Hans', 'Horvat', 'Hale', 'Slikica7', '1234','hh1234@fer.hr','1.11.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Martina', 'Bosanac', 'Bosanac', 'Slikica8', '1234','mb1234@fer.hr','1.11.2022');

INSERT INTO REGISTERED (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Sergej', 'Modrić', 'buraz', 'Slikica9', '1234','sm1234@fer.hr','14.11.2022');


INSERT INTO MODERATOR VALUES (1);

INSERT INTO STUDY_PROGRAMME VALUES (DEFAULT, 'R');

INSERT INTO STUDY_PROGRAMME VALUES (DEFAULT, 'E');


INSERT INTO COURSE VALUES (DEFAULT, 'Teorija Informacije', 'TINF', 1);

INSERT INTO COURSE VALUES (DEFAULT, 'Matematička analiza 3', 'MATAN3', 2);

INSERT INTO COURSE VALUES (DEFAULT, 'Električni krugovi', 'ELEKKRUG', 2);

INSERT INTO COURSE VALUES (DEFAULT, 'Robotika', 'ROB', 2);

INSERT INTO COURSE VALUES (DEFAULT, 'Algoritmi i strukture podataka', 'ASP', 1);

INSERT INTO COURSE VALUES (DEFAULT, 'Diskretna matematika', 'DISMAT', 1);

INSERT INTO COURSE VALUES (DEFAULT, 'Baza podataka', 'BAZPOD', 1);

INSERT INTO COURSE VALUES (DEFAULT, 'Javna rasvjeta', 'JAVRAS', 2);

INSERT INTO COURSE VALUES (DEFAULT, 'Automatsko upravljanje', 'AUTUPRV', 2);

INSERT INTO COURSE VALUES (DEFAULT, 'Java', 'JAVA', 1);

INSERT INTO CATEGORY VALUES (DEFAULT, 'LAB', 1);

INSERT INTO CATEGORY VALUES (DEFAULT, 'MI', 2);

INSERT INTO CATEGORY VALUES (DEFAULT, 'ZI', 3);

INSERT INTO CATEGORY VALUES (DEFAULT, 'BLIC', 4);

INSERT INTO POST VALUES (DEFAULT,'Oglas 1', 'Opis tražim pomoć','15.1.2022','tražim',1,1);

INSERT INTO POST VALUES (DEFAULT,'Oglas 2', 'Opis nudim pomoć','20.1.2022','nudim',1,1);

INSERT INTO POST VALUES (DEFAULT,'Oglas 3', 'Opis nudim pomoć','20.1.2022','nudim',1,2);

INSERT INTO POST VALUES (DEFAULT,'Oglas 4', 'Trebam pomoć iz VIS-a!!! ','20.1.2022','tražim',5,3);

INSERT INTO POST VALUES (DEFAULT,'Oglas 5', 'Nudim instrukcije iz Objektno orjentiranog programiranja','12.12.2022','nudim',4,1);

INSERT INTO POST VALUES (DEFAULT,'Oglas 6', 'Trebam pomoć iz VIS-a!!! ','20.1.2022','tražim',9,3);

INSERT INTO POST VALUES (DEFAULT,'Oglas 7', 'Krugovi su teški, trebam pomoć!?','10.7.2022','tražim',8,1);

INSERT INTO POST VALUES (DEFAULT,'Oglas 8', 'Nudim pripreme za blic iz Javne rasvjete','10.4.2022','nudim',4,4);

INSERT INTO POST VALUES (DEFAULT,'Oglas 9', 'Nudim instrukcije iz Jave','2.12.2022','nudim',8,4);

INSERT INTO POST VALUES (DEFAULT,'Oglas 10', 'Trebam pomoć iz ASP-a ASAP','13.12.2022','tražim',2,4);

INSERT INTO POST VALUES (DEFAULT,'Oglas 11', 'Trebam pomoć iz BAZA','10.11.2022','tražim',3,1);

INSERT INTO POST VALUES (DEFAULT,'Oglas 12', 'Trebam pomoć iz Robotike','11.11.2022','tražim',6,1);

INSERT INTO POST VALUES (DEFAULT,'Oglas 13', 'Pišem šalabahtere za TINF','11.11.2022','nudim',7,1);

INSERT INTO REPLIES VALUES (DEFAULT,'reply text neki', '28.1.2022','aktivan', 2, 1);

INSERT INTO REPLIES VALUES (DEFAULT,'dragi mogu ti ja pomoć', '10.10.2022','aktivan', 1, 3);

INSERT INTO REPLIES VALUES (DEFAULT,'Evo mene, evo mene', '10.10.2022','aktivan', 2, 13);

INSERT INTO REPLIES VALUES (DEFAULT,'Evo mene, evo mene ali još jednom evo mene', '10.10.2022','aktivan', 6, 13);

INSERT INTO REPLIES VALUES (DEFAULT,'Za 100kn/h sve je moguće', '10.10.2022','aktivan', 5, 12);

INSERT INTO REPLIES VALUES (DEFAULT,'Buraz sve ćemo se dogovoriti', '1.7.2022','aktivan', 5, 5);

INSERT INTO REPLIES VALUES (DEFAULT,'Smatraj to rješenim', '1.7.2022','aktivan', 3, 6);

INSERT INTO REPLIES VALUES (DEFAULT,'Ajde krugove je i Antimon prošao kad sam mu ja objasnio', '1.7.2022','aktivan', 4, 7);
