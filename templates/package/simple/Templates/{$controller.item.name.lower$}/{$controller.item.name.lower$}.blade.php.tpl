{{-- Part of {$package.name.cap$} project. --}}
<?php
/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app      \Windwalker\Web\Application                 Global Application
 * @var $package  \{$package.namespace$}{$package.name.cap$}\{$package.name.cap$}Package                   Package object.
 * @var $view     \Windwalker\Data\Data                       Some information of this view.
 * @var $uri      \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $chronos  \Windwalker\Core\DateTime\Chronos           PHP DateTime object of current time.
 * @var $helper   \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router   \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset    \Windwalker\Core\Asset\AssetManager         The Asset manager.
 *
 * View variables
 * --------------------------------------------------------------
 * @var $item     \{$package.namespace$}{$package.name.cap$}\Record\{$controller.item.name.cap$}Record
 * @var $state    \Windwalker\Structure\Structure
 */
?>

@extends('_global.html')

@push('script')
    {{-- Add Script Here --}}
@endpush

@section('content')
    <div class="container {$controller.item.name.lower$}-item">
        <h1>{$controller.item.name.cap$} Item</h1>
        <p>
            <a class="btn btn-default btn-outline-secondary" href="{{ $router->route('{$controller.list.name.lower$}') }}">
                <span class="fa fa-chevron-left"></span>
                Back to List
            </a>
        </p>
        <hr />
        <img src="{{ $item->image }}" alt="Image">
        <h2>{{ $item->title }}</h2>
        <p>{{ $item->introtext }}</p>
        <p>{{ $item->fulltext }}</p>
    </div>
@stop
