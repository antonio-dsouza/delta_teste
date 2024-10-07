<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->group('api', function ($routes) {
    $routes->resource('students', ['controller' => 'StudentsController']);
    $routes->get('dashboard', 'DashboardController::index');
});

$routes->group('auth', function ($routes) {
    $routes->post('register', 'AuthController::register');
    $routes->post('login', 'AuthController::login');
});
