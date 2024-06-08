--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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

SET default_table_access_method = heap;

--
-- Name: user_info; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.user_info (
    user_id integer NOT NULL,
    username character varying(60) NOT NULL,
    best_score integer DEFAULT '-1'::integer,
    total_games_played integer DEFAULT 0
);


ALTER TABLE public.user_info OWNER TO freecodecamp;

--
-- Name: user_info_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.user_info_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_info_user_id_seq OWNER TO freecodecamp;

--
-- Name: user_info_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.user_info_user_id_seq OWNED BY public.user_info.user_id;


--
-- Name: user_info user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.user_info ALTER COLUMN user_id SET DEFAULT nextval('public.user_info_user_id_seq'::regclass);


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.user_info VALUES (3, 'user_1717813538711', 88, 2);
INSERT INTO public.user_info VALUES (13, 'user_1717814655916', 680, 2);
INSERT INTO public.user_info VALUES (2, 'user_1717813538712', 76, 5);
INSERT INTO public.user_info VALUES (29, 'user_1717816331670', 870, 1);
INSERT INTO public.user_info VALUES (12, 'user_1717814655917', 61, 5);
INSERT INTO public.user_info VALUES (5, 'user_1717813610061', 369, 2);
INSERT INTO public.user_info VALUES (4, 'user_1717813610062', 284, 5);
INSERT INTO public.user_info VALUES (28, 'user_1717816331671', 364, 4);
INSERT INTO public.user_info VALUES (15, 'user_1717814907322', 177, 2);
INSERT INTO public.user_info VALUES (7, 'user_1717814062318', 527, 2);
INSERT INTO public.user_info VALUES (14, 'user_1717814907323', 322, 5);
INSERT INTO public.user_info VALUES (6, 'user_1717814062319', 65, 5);
INSERT INTO public.user_info VALUES (17, 'user_1717815046962', 0, 2);
INSERT INTO public.user_info VALUES (9, 'user_1717814091375', 77, 2);
INSERT INTO public.user_info VALUES (16, 'user_1717815046963', 0, 5);
INSERT INTO public.user_info VALUES (8, 'user_1717814091376', 200, 5);
INSERT INTO public.user_info VALUES (32, 'user_1717816620616', 109, 2);
INSERT INTO public.user_info VALUES (11, 'user_1717814316757', 93, 2);
INSERT INTO public.user_info VALUES (19, 'user_1717815210055', 0, 2);
INSERT INTO public.user_info VALUES (10, 'user_1717814316758', 159, 5);
INSERT INTO public.user_info VALUES (31, 'user_1717816620617', 101, 5);
INSERT INTO public.user_info VALUES (18, 'user_1717815210056', 0, 5);
INSERT INTO public.user_info VALUES (21, 'user_1717815658863', 0, 2);
INSERT INTO public.user_info VALUES (20, 'user_1717815658864', 0, 5);
INSERT INTO public.user_info VALUES (34, 'user_1717816803209', 139, 2);
INSERT INTO public.user_info VALUES (23, 'user_1717816141291', 0, 2);
INSERT INTO public.user_info VALUES (33, 'user_1717816803210', 289, 5);
INSERT INTO public.user_info VALUES (22, 'user_1717816141292', 0, 5);
INSERT INTO public.user_info VALUES (25, 'user_1717816143740', 0, 2);
INSERT INTO public.user_info VALUES (35, 'bob', 11, 2);
INSERT INTO public.user_info VALUES (24, 'user_1717816143741', 0, 5);
INSERT INTO public.user_info VALUES (27, 'user_1717816148036', 0, 2);
INSERT INTO public.user_info VALUES (26, 'user_1717816148037', 0, 5);
INSERT INTO public.user_info VALUES (37, 'user_1717816945150', 86, 2);
INSERT INTO public.user_info VALUES (36, 'user_1717816945151', 55, 5);
INSERT INTO public.user_info VALUES (30, 'seb', 5, 4);
INSERT INTO public.user_info VALUES (38, 'stefam', -1, 1);


--
-- Name: user_info_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.user_info_user_id_seq', 38, true);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_id);


--
-- Name: user_info user_info_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

