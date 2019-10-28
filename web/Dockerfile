FROM php:apache

RUN a2enmod headers

COPY badgeuse.conf /etc/apache2/sites-available
COPY badgeuse.conf /etc/apache2/sites-enabled
