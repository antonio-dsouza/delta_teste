FROM php:8.3-fpm

RUN apt-get update && apt-get install -y --fix-missing \
    git \
    curl \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    unzip \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql mbstring zip  pdo pdo_mysql mysqli exif pcntl bcmath opcache intl

WORKDIR /var/www

COPY . .

RUN chown -R www-data:www-data /var/www/writable
RUN chmod -R 777 /var/www/writable

EXPOSE 9000

CMD ["php-fpm", "-F"]
