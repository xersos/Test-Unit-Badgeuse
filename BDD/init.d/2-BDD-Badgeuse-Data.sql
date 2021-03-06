use badgeuse;

-- -----------------------------------------------------
-- DATA users
-- -----------------------------------------------------
INSERT IGNORE INTO `users` (`prenom_user`, `nom_user`, `mail_user`, `id_role`) VALUES

('Oussama', 'Sadeg', 'oussama.sadeg@uha.fr', 1),
('Jérôme', 'Andre', 'jerome.andre@uha.fr', 1),
('Achraf', 'Haddouch', 'achraf.haddouch@uha.fr', 1),
('Antoine', 'Carette', 'antoine.carette@uha.fr', 1),
('Anthony', 'Schwartz', 'anthony.schwartz@uha.fr', 1),
('Stephane', 'Brichler', 'stephane.brichler@uha.fr', 1),
('Charly', 'Bihel', 'charly.bihel@uha.fr', 1),
('Nicolas', 'Piszewski', 'nicolas.piszewski@uha.fr', 1),
('Florian', 'Biller', 'florian.biller@uha.fr', 1),
('Gauthier', 'Vuillemin', 'gauthier.vuillemin@uha.fr', 1),
('Maxime', 'Rayot', 'maxime.rayot@uha.fr', 1),
('David', 'Khyrmandy', 'david.khyrmandy@uha.fr', 1),
('Quentin', 'Grebe', 'quentin.grebe@uha.fr', 1),
('Florent', 'Haffner', 'florent.haffner@uha.fr', 1),
('Orane', 'Mendes', 'orane.mendes@uha.fr', 1),
('Valentin', 'Fritz', 'valentin.fritz@uha.fr', 1),
('Vincent', 'Meneur', 'vincent.meneur@uha.fr', 1),
('Pierre Louis', 'Braun', 'pierre-louis.braun@uha.fr', 1),
('Ioannis', 'Karapostolis', 'ioannis.karapostolis@uha.fr', 1),
('Florent', 'Keiflin', 'florent.keiflin@uha.fr', 1),
('Chloe', 'Prudham', 'chloe.prudham@uha.fr', 1),
('Franck', 'Hubschwerle', 'franck.hubschwerle@uha.fr', 1),
('Adrien', 'Kolodziej', 'adrien.kolodziej@uha.fr', 1),
('Aghiles', 'Nessah', 'aghiles.nessah@uha.fr', 1),
('Alvin', 'Frey', 'alvin.frey@uha.fr', 1),
('Valentin', 'Tahon', 'valentin.tahon@uha.fr', 1),
('Victor', 'Damiano', 'victor.damiano@uha.fr', 3),
('Luc', 'ratelli', 'luc.ratelli@uha.fr', 1),
('Jimmy', 'Heitz', 'jimmy.heitz@uha.fr', 1),
('Etrit', 'Halili', 'etrit.halili@uha.fr', 1),
('Hélène', 'David', 'helene.david@uha.fr', 1),
('Anthony', 'Spinali', 'anthony.spinali@uha.fr', 1),
('Alexandre', 'Dias-Omonte', 'alexandre.dias-omonte@uha.fr', 1),
('Elodie', 'Balaia', 'elodie.balaia@uha.fr', 1),
('Thomas', 'Tosch', 'thomas.tosch@uha.fr', 1),
('Aurelien', 'Diss', 'aurelien.diss@uha.fr', 1),
('Natan', 'Fourie', 'natan.fourie@uha.fr', 1),
('Alexis', 'Martinez', 'alexis.martinez@uha.fr', 1),
('Christophe', 'Bourgeois', 'christophe.bourgeois@uha.fr', 1),
('Gauthier', 'Staehler', 'gauthier.staehler@uha.fr', 1),
('Kamel', 'Seddik', 'kamel.seddik@uha.fr', 1),
('Mouloud', 'Hammoutène', 'mouloud.hammoutene@uha.fr', 1),
('Rabie', 'Bougedrawi', 'rabie.bougedrawi@uha.fr', 1),
('Valentin', 'Cartier', 'valentin.cartier@uha.fr', 1),
('Thomas', 'Fritsch', 'thomas.fritsch@uha.fr', 1),
('Quentin', 'Kollaros', 'quentin.kollaros@uha.fr', 1),
('Alexandre', 'Royer', 'alexandre.royer@uha.fr', 1),
('Lucas', 'Suhner', 'lucas.suhner@uha.fr', 1),
('Corentin', 'Jacob', 'corentin.jacob@uha.fr', 1),
('Loïc', 'Deverre', 'loic.deverre@uha.fr', 1),
('Etienne', 'Burger', 'etienne_burger@yahoo.fr', 2),
('Jean Francois', 'Roth', 'jean-francois.roth@uha.fr', 2);

-- -----------------------------------------------------
-- DATA users_extend
-- -----------------------------------------------------
INSERT IGNORE INTO `users_extend` (`id_group`) VALUES
(4),(4),

(3),(2),(2),(3),(1),(1),(2),(2),(3),(2),(3),(3),(2),(1),(2),(3),(1),(3),(2),(2),(2),(1),(2),(3),(2),
(3),(3),(1),(1),(2),(2),(2),(3),(1),(1),(1),(3),(2),(2),(1),(3),(3),(2),(2),(1),(3),(2),(2),(3),(3),

(NULL),(NULL);

-- TODO : a supprimer pour le résultat final
-- -----------------------------------------------------
-- DATA badger
-- -----------------------------------------------------
INSERT IGNORE INTO `badger` (`id_user`, `start_point`, `end_point`, `duration`) VALUES
(8, '2019-01-07 08:11:00', '2019-01-07 16:23:00', '08:12:00'),
(10, '2019-01-07 08:25:00', '2019-01-07 16:45:00', '08:20:00'),
(6, '2019-01-07 08:30:00', '2019-01-07 16:50:00', '08:20:00'),
(12, '2019-01-08 08:00:00', '2019-01-08 17:00:00', '09:00:00'),
(8, '2019-01-08 08:48:46', '2019-01-08 15:19:16', '06:30:30'),
(10, '2019-01-08 09:00:00', '2019-01-08 16:30:00', '07:30:00'),
(12, '2019-01-09 08:00:00', '2019-01-09 17:00:00', '09:00:00'),
(8, '2019-01-09 08:48:46', '2019-01-09 17:19:16', '08:30:30'),
(12, '2019-01-10 08:00:00', '2019-01-10 17:00:00', '09:00:00'),
(8, '2019-01-10 09:48:46', '2019-01-10 17:19:16', '07:30:30'),
(12, '2019-01-11 08:00:00', '2019-01-11 17:00:00', '09:00:00'),
(8, '2019-01-11 08:02:46', '2019-01-11 18:00:00', '09:57:14'),
(8, '2019-01-11 11:48:32', '2019-01-11 11:48:39', '00:00:07'),
(8, '2019-01-11 11:48:55', '2019-01-11 11:55:31', '00:06:36'),
(8, '2019-01-11 12:07:24', '2019-01-11 12:07:44', '00:00:20'),
(8, '2019-01-11 12:07:55', '2019-01-11 16:00:25', '03:52:30'),
(8, '2019-01-14 09:11:10', '2019-01-14 17:11:18', '00:00:08'),
(9, '2019-01-16 12:42:46', '2019-01-16 12:42:58', '00:00:12'),
(8, '2019-01-16 13:54:48', '2019-01-16 14:20:35', '00:25:47'),
(15, '2019-01-16 14:20:47', '2019-01-16 14:23:09', '00:02:22'),
(13, '2019-01-16 14:23:19', '2019-01-16 15:07:19', '00:44:00'),
(25, '2019-01-16 15:07:28', '2019-01-17 14:26:30', '23:19:02'),
(12, '2019-01-17 14:26:37', '2019-01-17 14:37:20', '00:10:43'),

(1, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '07:45:33'),
(2, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '06:45:33'),
(3, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:45:33'),
(4, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '07:45:33'),
(5, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:45:33'),
(6, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:45:33'),
(7, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '06:45:33'),
(8, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '06:45:33'),
(9, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '05:45:33'),
(10, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '03:45:33'),
(11, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '07:45:33'),
(12, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '05:45:33'),
(13, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '03:45:33'),
(14, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:45:33'),
(15, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '09:45:33'),
(16, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '07:45:33'),
(17, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:45:33'),
(18, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:55:33'),
(19, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:15:33'),
(20, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:25:33'),
(21, '2019-01-16 09:15:27', '2019-01-16 17:00:00', '08:35:33'),

(1, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '07:45:33'),
(2, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '06:45:33'),
(3, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:45:33'),
(4, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '07:45:33'),
(5, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:45:33'),
(6, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:45:33'),
(7, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '06:45:33'),
(8, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '06:45:33'),
(9, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '05:45:33'),
(10, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '03:45:33'),
(11, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '07:45:33'),
(12, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '05:45:33'),
(13, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '03:45:33'),
(14, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:45:33'),
(15, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '09:45:33'),
(16, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '07:45:33'),
(17, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:45:33'),
(18, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:55:33'),
(19, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:15:33'),
(20, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:25:33'),
(21, '2019-01-17 09:15:27', '2019-01-17 17:00:00', '08:35:33'),

(1, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '07:45:33'),
(2, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '06:45:33'),
(3, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:45:33'),
(4, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '07:45:33'),
(5, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:45:33'),
(6, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:45:33'),
(7, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '06:45:33'),
(8, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '06:45:33'),
(9, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '05:45:33'),
(10, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '03:45:33'),
(11, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '07:45:33'),
(12, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '05:45:33'),
(13, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '03:45:33'),
(14, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:45:33'),
(15, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '09:45:33'),
(16, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '07:45:33'),
(17, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:45:33'),
(18, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:55:33'),
(19, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:15:33'),
(20, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:25:33'),
(21, '2019-01-18 09:15:27', '2019-01-18 17:00:00', '08:35:33'),

(1, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '07:45:33'),
(2, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '06:45:33'),
(3, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:45:33'),
(4, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '07:45:33'),
(5, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:45:33'),
(6, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:45:33'),
(7, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '06:45:33'),
(8, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '06:45:33'),
(9, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '05:45:33'),
(10, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '03:45:33'),
(11, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '07:45:33'),
(12, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '05:45:33'),
(13, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '03:45:33'),
(14, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:45:33'),
(15, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '09:45:33'),
(16, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '07:45:33'),
(17, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:45:33'),
(18, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:55:33'),
(19, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:15:33'),
(20, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:25:33'),
(21, '2019-01-19 09:15:27', '2019-01-19 17:00:00', '08:35:33'),

(1, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '07:45:33'),
(2, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '06:45:33'),
(3, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:45:33'),
(4, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '07:45:33'),
(5, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:45:33'),
(6, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:45:33'),
(7, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '06:45:33'),
(8, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '06:45:33'),
(9, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '05:45:33'),
(10, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '03:45:33'),
(11, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '07:45:33'),
(12, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '05:45:33'),
(13, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '03:45:33'),
(14, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:45:33'),
(15, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '09:45:33'),
(16, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '07:45:33'),
(17, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:45:33'),
(18, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:55:33'),
(19, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:15:33'),
(20, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:25:33'),
(21, '2019-01-20 09:15:27', '2019-01-20 17:00:00', '08:35:33'),

(6, '2019-01-18 09:22:19', '2019-01-18 10:08:41', '00:46:22'),
(8, '2019-01-18 10:08:47', '2019-01-18 14:04:56', '03:56:09');



