<?php
/**
 * @var $form \Windwalker\Form\Form
 */

$search = !(isset($search) && $search === false);
$filter = !(isset($filter) && $filter === false);

$filterFields = $form->getFields(null, 'filter');
?>
{{-- Mobile Title --}}
<h3 class="visible-xs-block">
    @translate('phoenix.grid.filter.title')
</h3>

@if ($search || $filter)
    {{-- Search Bar --}}
    <div class="search-container form-inline">
        @if ($search)
            {{-- Search Fields Select --}}
            @php($field = $form->getField('field', 'search'))
            {!! $field->appendAttribute('labelClass', ' sr-only')->renderLabel() !!}

            @if ($field->get('display'))
                {!! $field->appendAttribute('class', ' form-control')->renderInput() !!}
            @else
                <input id="{{ $field->getId() }}" name="{{ $field->getFieldName() }}" value="{{ $field->getValue() }}" type="hidden" />
            @endif

            {{-- Search Input --}}
            {!! $form->getField('content', 'search')->appendAttribute('labelClass', ' sr-only')->renderLabel() !!}
            <div class="input-group">
                {!! $form->getField('content', 'search')->appendAttribute('class', ' form-control')->renderInput() !!}

                {{-- Submit Button --}}
                <span class="input-group-btn">
            <button class="btn btn-default hasTooltip" type="submit"
                title="@translate('phoenix.grid.search.button.desc')">
                <span class="fa fa-search"></span>
            </button>
        </span>
            </div>
        @endif

        {{-- Search Button --}}
        <div class="btn-group filter-buttons-group">

            @if ($filter && count($filterFields))
            {{-- Filter Toggle Button --}}
            <button type="button" class="btn {{ $show ? 'btn-primary' : 'btn-default' }} filter-toggle-button hasTooltip"
                data-class-show="btn-primary"
                data-class-hide="btn-default"
                title="@translate('phoenix.grid.filter.button.desc')">
                @translate('phoenix.grid.filter.button.text')

                {{-- Button Icon --}}
                <span
                    class="filter-button-icon fa fa-angle-{{ $show ? 'up' : 'down' }}"
                    data-class-show="fa fa-angle-up"
                    data-class-hide="fa fa-angle-down"
                ></span>
            </button>
            @endif

            {{-- Clear Button --}}
            <button type="button" class="btn btn-default search-clear-button hasTooltip"
                title="@translate('phoenix.grid.clear.button.desc')">
                <span class="fa fa-remove"></span>
            </button>
        </div>
    </div>
@endif

@if ($filter && count($filterFields))
    {{-- Filter Bar --}}
    <div class="filter-container row {{ $show ? 'shown' : null }}" style="{{ $show ? null : 'display: none;' }}">
        @foreach($form->getFields(null, 'filter') as $field)

            {{-- Spacer --}}
            @if ($field->getType() == 'spacer')
                <div class="col-md-12">
                    @if ($field->getLabel())
                        <h4>{{ $field->getLabel() }}</h4>
                    @endif

                    @if ($field->get('description'))
                        <p>{{ $field->get('description') }}</p>
                    @endif
                </div>
            @else

                {{-- Filter Input --}}
                <div class="form-group col-sm-4 col-md-3">
                    {!! $field->appendAttribute('labelClass', ' sr-only')->renderLabel() !!}
                    {!! $field->appendAttribute('class', ' form-control')->renderInput() !!}
                </div>
            @endif
        @endforeach
    </div>
@endif
