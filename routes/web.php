<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('tugas');
});

Route::get('/tugas', function () {
    return view('tugas');
})->name('tugas');