--
-- PostgreSQL database dump
--

-- Dumped from database version 11.18 (Debian 11.18-1.pgdg100+1)
-- Dumped by pg_dump version 11.18 (Debian 11.18-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    categoryid integer NOT NULL,
    categoryname character varying(100) NOT NULL,
    courseid integer NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_categoryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_categoryid_seq OWNER TO postgres;

--
-- Name: category_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_categoryid_seq OWNED BY public.category.categoryid;


--
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    courseid integer NOT NULL,
    coursename character varying(100) NOT NULL,
    abbreviationcourse character varying(100) NOT NULL,
    programmeid integer NOT NULL
);


ALTER TABLE public.course OWNER TO postgres;

--
-- Name: course_courseid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_courseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_courseid_seq OWNER TO postgres;

--
-- Name: course_courseid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_courseid_seq OWNED BY public.course.courseid;


--
-- Name: deletedpost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deletedpost (
    explanation character varying(1000) NOT NULL,
    deletoruserid integer NOT NULL,
    postid integer NOT NULL
);


ALTER TABLE public.deletedpost OWNER TO postgres;

--
-- Name: grade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grade (
    grade integer NOT NULL,
    instructorid integer NOT NULL,
    learnerid integer NOT NULL,
    postid integer NOT NULL
);


ALTER TABLE public.grade OWNER TO postgres;

--
-- Name: moderator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.moderator (
    userid integer NOT NULL
);


ALTER TABLE public.moderator OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    postid integer NOT NULL,
    posttitle character varying(100) NOT NULL,
    postdescription character varying(1000) NOT NULL,
    timeofcreation date NOT NULL,
    creatoruserid integer NOT NULL,
    categoryid integer NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: post_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_postid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_postid_seq OWNER TO postgres;

--
-- Name: post_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_postid_seq OWNED BY public.post.postid;


--
-- Name: registered; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registered (
    userid integer NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    username character varying NOT NULL,
    useravatar character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    created date
);


ALTER TABLE public.registered OWNER TO postgres;

--
-- Name: registered_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registered_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registered_userid_seq OWNER TO postgres;

--
-- Name: registered_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registered_userid_seq OWNED BY public.registered.userid;


--
-- Name: replies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.replies (
    replyid integer NOT NULL,
    replytext character varying(1000) NOT NULL,
    replycreated date NOT NULL,
    statusvalue character varying NOT NULL,
    replycreatorid integer NOT NULL,
    postid integer NOT NULL
);


ALTER TABLE public.replies OWNER TO postgres;

--
-- Name: replies_replyid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.replies_replyid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.replies_replyid_seq OWNER TO postgres;

--
-- Name: replies_replyid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.replies_replyid_seq OWNED BY public.replies.replyid;


--
-- Name: study_programme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.study_programme (
    programmeid integer NOT NULL,
    programename character varying(100) NOT NULL
);


ALTER TABLE public.study_programme OWNER TO postgres;

--
-- Name: study_programme_programmeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.study_programme_programmeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.study_programme_programmeid_seq OWNER TO postgres;

--
-- Name: study_programme_programmeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.study_programme_programmeid_seq OWNED BY public.study_programme.programmeid;


--
-- Name: category categoryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN categoryid SET DEFAULT nextval('public.category_categoryid_seq'::regclass);


--
-- Name: course courseid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course ALTER COLUMN courseid SET DEFAULT nextval('public.course_courseid_seq'::regclass);


--
-- Name: post postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN postid SET DEFAULT nextval('public.post_postid_seq'::regclass);


--
-- Name: registered userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registered ALTER COLUMN userid SET DEFAULT nextval('public.registered_userid_seq'::regclass);


--
-- Name: replies replyid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies ALTER COLUMN replyid SET DEFAULT nextval('public.replies_replyid_seq'::regclass);


--
-- Name: study_programme programmeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_programme ALTER COLUMN programmeid SET DEFAULT nextval('public.study_programme_programmeid_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (categoryid, categoryname, courseid) FROM stdin;
1	LAB	1
2	LAB	2
3	LAB	3
4	LAB	4
5	LAB	5
6	LAB	6
7	LAB	7
8	LAB	8
9	LAB	9
10	LAB	10
11	MI	1
12	MI	2
13	MI	3
14	MI	4
15	MI	5
16	MI	6
17	MI	7
18	MI	8
19	MI	9
20	MI	10
21	ZI	1
22	ZI	2
23	ZI	3
24	ZI	4
25	ZI	5
26	ZI	6
27	ZI	7
28	ZI	8
29	ZI	9
30	ZI	10
31	BLIC	1
32	BLIC	2
33	BLIC	3
34	BLIC	4
35	BLIC	5
36	BLIC	6
37	BLIC	7
38	BLIC	8
39	BLIC	9
40	BLIC	10
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (courseid, coursename, abbreviationcourse, programmeid) FROM stdin;
1	Teorija Informacije	TINF	1
2	Matematička analiza 3	MATAN3	2
3	Električni krugovi	ELEKKRUG	2
4	Robotika	ROB	2
5	Algoritmi i strukture podataka	ASP	1
6	Diskretna matematika	DISMAT	1
7	Baza podataka	BAZPOD	1
8	Javna rasvjeta	JAVRAS	2
9	Automatsko upravljanje	AUTUPRV	2
10	Java	JAVA	1
\.


--
-- Data for Name: deletedpost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deletedpost (explanation, deletoruserid, postid) FROM stdin;
\.


--
-- Data for Name: grade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grade (grade, instructorid, learnerid, postid) FROM stdin;
5	3	4	3
1	4	2	1
5	2	5	7
\.


--
-- Data for Name: moderator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.moderator (userid) FROM stdin;
1
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (postid, posttitle, postdescription, timeofcreation, creatoruserid, categoryid) FROM stdin;
3	Jej	2324	2022-12-18	4	37
1	BakiG	jos nemam post! radi haha	2022-12-18	2	11
6	Prijenosna funkcija sta je?	kaj je to? jel to nosi nekog na ramenima?	2022-12-19	2	21
7	Volim grafove	Volim bojati grafove najbolji predmet lp	2022-12-19	5	26
8	Grafana Inženjer	Tražim inženjera koji zna nešto osim haskella da riješi stvarne životne probleme.	2022-12-19	6	34
9	kaj je povezana lista	nemrem se povezat sa svojom listom	2022-12-26	2	5
10	ljubara proba	loool dis izi	2023-01-07	2	16
11	Trebala bih pomoć iz električnih krugova	Sama kao list na vetru sama na ovom svetu\nNeGrejemJaNaStariPlamen.com	2023-01-07	16	13
12	matan3	Pomazem kod bliceva iz matana3	2023-01-09	6	32
\.


--
-- Data for Name: registered; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registered (userid, firstname, lastname, username, useravatar, password, email, created) FROM stdin;
1	Ivo	Ivić	Ivek	Slikica1	1234	ii1234@fer.hr	2022-01-01
3	bartol	grbeša	bakig2	bakig2.png	12345678	bg@fer.hr	2022-12-18
5	Ivan	Inkret	Inkret	Inkret.jpg	522655218x	ivan.inkret@fer.hr	2022-12-19
6	Jure	Gazda	gazda	gazda.png	12345678	jk@fer.hr	2022-12-19
12	Lepi	Miške	lepiMiskeGlasBalkana	lepiMiskeGlasBalkana.jpg	123456789	lm20@fer.hr	\N
13	Lepi	Miške	lepiMiskeLepoPeva	lepiMiskeLepoPeva.jpg	narodnaGlazba	lm123@fer.hr	\N
14	Ana	Bekuta	zlatiborskezore	zlatiborskezore.png	zavolehte	anabekuta@fer.hr	\N
15	ljubara	bubara	ljubara	ljubara.jpg	12345678	dl53150@fer.hr	2023-01-07
16	Dragana	Mirković	samakaolistnavetru	samakaolistnavetru.png	123456789	mk53370@fer.hr	2023-01-07
2	Mislav	Domlija	giroud	giroud.png	11223344	md53131@fer.hr	2022-12-18
4	Fran	Belac	milence	Fran23.jpg	12345678	fb53092@fer.hr	2022-12-18
\.


--
-- Data for Name: replies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.replies (replyid, replytext, replycreated, statusvalue, replycreatorid, postid) FROM stdin;
3	hej fran	2022-12-18	graded	3	3
4	Zelis li se hrvati?	2022-12-18	graded	3	3
5	hej ja bi se hrvao	2022-12-18	aktivan	2	3
2	Mrzim bakig	2022-12-18	graded	4	1
6	Baki?	2022-12-19	accepted	4	1
8	dosta fora gospon	2022-12-19	graded	2	7
10	dhsshhhsd	2022-12-21	aktivan	6	6
9	Nema takvih haskell je buducnost	2022-12-19	accepted	5	8
11	Gde si sta ima? os pomoc\n	2023-01-09	aktivan	6	3
12	I ja ih isto volim makar je jaci sap\n	2023-01-09	aktivan	6	7
\.


--
-- Data for Name: study_programme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.study_programme (programmeid, programename) FROM stdin;
1	R
2	E
\.


--
-- Name: category_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_categoryid_seq', 40, true);


--
-- Name: course_courseid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_courseid_seq', 10, true);


--
-- Name: post_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_postid_seq', 12, true);


--
-- Name: registered_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registered_userid_seq', 23, true);


--
-- Name: replies_replyid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.replies_replyid_seq', 12, true);


--
-- Name: study_programme_programmeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.study_programme_programmeid_seq', 2, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (categoryid);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (courseid);


--
-- Name: deletedpost deletedpost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deletedpost
    ADD CONSTRAINT deletedpost_pkey PRIMARY KEY (postid);


--
-- Name: grade grade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_pkey PRIMARY KEY (instructorid, learnerid, postid);


--
-- Name: moderator moderator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moderator
    ADD CONSTRAINT moderator_pkey PRIMARY KEY (userid);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (postid);


--
-- Name: registered registered_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registered
    ADD CONSTRAINT registered_email_key UNIQUE (email);


--
-- Name: registered registered_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registered
    ADD CONSTRAINT registered_pkey PRIMARY KEY (userid);


--
-- Name: registered registered_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registered
    ADD CONSTRAINT registered_username_key UNIQUE (username);


--
-- Name: replies replies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (replyid);


--
-- Name: study_programme study_programme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_programme
    ADD CONSTRAINT study_programme_pkey PRIMARY KEY (programmeid);


--
-- Name: category category_courseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_courseid_fkey FOREIGN KEY (courseid) REFERENCES public.course(courseid);


--
-- Name: course course_programmeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_programmeid_fkey FOREIGN KEY (programmeid) REFERENCES public.study_programme(programmeid);


--
-- Name: deletedpost deletedpost_deletoruserid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deletedpost
    ADD CONSTRAINT deletedpost_deletoruserid_fkey FOREIGN KEY (deletoruserid) REFERENCES public.moderator(userid);


--
-- Name: deletedpost deletedpost_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deletedpost
    ADD CONSTRAINT deletedpost_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(postid);


--
-- Name: grade grade_instructorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_instructorid_fkey FOREIGN KEY (instructorid) REFERENCES public.registered(userid);


--
-- Name: grade grade_learnerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_learnerid_fkey FOREIGN KEY (learnerid) REFERENCES public.registered(userid);


--
-- Name: grade grade_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT grade_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(postid) ON DELETE CASCADE;


--
-- Name: moderator moderator_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moderator
    ADD CONSTRAINT moderator_userid_fkey FOREIGN KEY (userid) REFERENCES public.registered(userid);


--
-- Name: post post_categoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.category(categoryid);


--
-- Name: post post_creatoruserid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_creatoruserid_fkey FOREIGN KEY (creatoruserid) REFERENCES public.registered(userid);


--
-- Name: replies replies_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(postid) ON DELETE CASCADE;


--
-- Name: replies replies_replycreatorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_replycreatorid_fkey FOREIGN KEY (replycreatorid) REFERENCES public.registered(userid);


--
-- PostgreSQL database dump complete
--

