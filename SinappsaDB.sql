CREATE TABLE REGISTRIRANI
(
  userID SERIAL PRIMARY KEY,
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  userName VARCHAR NOT NULL,
  userAvatar VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  created DATE NOT NULL,
  UNIQUE (userName),
  UNIQUE (email)
);

CREATE TABLE MODERATOR
(
  userID INT NOT NULL,
  PRIMARY KEY (userID),
  FOREIGN KEY (userID) REFERENCES REGISTRIRANI(userID)
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
  kraticaCourse VARCHAR(100) NOT NULL,
  programmeID INT NOT NULL,
  FOREIGN KEY (programmeID) REFERENCES STUDY_PROGRAMME(programmeID)
);

CREATE TABLE CATEGORY
(
  idKategorije SERIAL PRIMARY KEY,
  categoryName VARCHAR(100) NOT NULL,
  courseID INT NOT NULL,
  FOREIGN KEY (courseID) REFERENCES COURSE(courseID)
);

CREATE TABLE OGLAS
(
  oglasID SERIAL PRIMARY KEY,
  oglasTitle VARCHAR(100) NOT NULL,
  oglasDescription VARCHAR(100) NOT NULL,
  dateOfCreation DATE NOT NULL,
  vrstaOglasa VARCHAR(100) NOT NULL,
  creatorUserID INT NOT NULL,
  idKategorije INT NOT NULL,
  FOREIGN KEY (creatorUserID) REFERENCES REGISTRIRANI(userID),
  FOREIGN KEY (idKategorije) REFERENCES CATEGORY(idKategorije)
);

CREATE TABLE REPLIES
(
  replyID SERIAL PRIMARY KEY,
  replyText VARCHAR(1000) NOT NULL,
  replyCreated DATE NOT NULL,
  statusValue VARCHAR NOT NULL,
  replyCreatorID INT NOT NULL,
  oglasID INT NOT NULL,
  FOREIGN KEY (replyCreatorID) REFERENCES REGISTRIRANI(userID),
  FOREIGN KEY (oglasID) REFERENCES OGLAS(oglasID)
);

CREATE TABLE DELETEDOGLAS
(
  explanation VARCHAR(1000) NOT NULL,
  deletorUserID INT NOT NULL,
  oglasID INT NOT NULL,
  PRIMARY KEY (oglasID),
  FOREIGN KEY (deletorUserID) REFERENCES MODERATOR(userID),
  FOREIGN KEY (oglasID) REFERENCES OGLAS(oglasID)
);

CREATE TABLE GRADE
(
  grade INT NOT NULL,
  instructorID INT NOT NULL,
  learnerID INT NOT NULL,
  oglasID INT NOT NULL,
  PRIMARY KEY (instructorID, learnerID, oglasID),
  FOREIGN KEY (instructorID) REFERENCES REGISTRIRANI(userID),
  FOREIGN KEY (learnerID) REFERENCES REGISTRIRANI(userID),
  FOREIGN KEY (oglasID) REFERENCES OGLAS(oglasID)
);

INSERT INTO registrirani (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Ivo', 'Ivić', 'Ivek', 'Slikica1', '1234','ii1234@fer.hr','1.1.2022');

INSERT INTO registrirani (firstName, lastName, userName, userAvatar, password, email, created) 
VALUES ('Pero', 'Perić', 'Perke', 'Slikica2', '1234','pp1234@fer.hr','1.1.2022');

INSERT INTO moderator VALUES (1);

INSERT INTO study_programme VALUES (DEFAULT, 'R');

INSERT INTO study_programme VALUES (DEFAULT, 'E');

INSERT INTO course VALUES (DEFAULT, 'Teorija Informacije', 'TINF', 1);

INSERT INTO course VALUES (DEFAULT, 'Matematička analiza 3', 'MATAN3', 2);

INSERT INTO category VALUES (DEFAULT, 'LAB', 1);

INSERT INTO category VALUES (DEFAULT, 'MI', 2);

INSERT INTO oglas VALUES (DEFAULT, 'Oglas 1', 'Opis tražim pomoć','15.1.2022','tražim',1,1);

INSERT INTO oglas VALUES (DEFAULT, 'Oglas 2', 'Opis nudim pomoć','20.1.2022','nudim',1,1);

INSERT INTO replies VALUES (DEFAULT, 'reply text neki', '28.1.2022','aktivan', 2, 1);