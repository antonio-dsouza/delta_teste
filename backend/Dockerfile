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
    && docker-php-ext-install gd pdo pdo_mysql mbstring zip mysqli exif pcntl bcmath opcache intl

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

COPY . .

RUN composer dump-autoload --optimize

RUN mkdir -p /var/www/writable/cache && \
    chown -R www-data:www-data /var/www/writable && \
    chmod -R 775 /var/www/writable && \
    chown -R www-data:www-data /var/www/public && \
    chmod -R 775 /var/www/public

CMD ["sh", "-c", "chown -R www-data:www-data /var/www/writable && mkdir -p /var/www/writable/cache && chmod -R 777 /var/www/writable && chown -R www-data:www-data /var/www/public && chmod -R 775 /var/www/public && php-fpm"]

EXPOSE 9000
