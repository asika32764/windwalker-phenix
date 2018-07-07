<?php
/**
 * Part of {$package.name.cap$} project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace {$package.namespace$}{$package.name.cap$}\Form\{$controller.item.name.cap$};

use {$package.namespace$}{$package.name.cap$}\Field\{$controller.item.name.cap$}\{$controller.item.name.cap$}ListField;
use {$package.namespace$}{$package.name.cap$}\Field\{$controller.item.name.cap$}\{$controller.item.name.cap$}ModalField;
use Phoenix\Form\Filter\UtcFilter;
use Phoenix\Form\PhoenixFieldTrait;
use Windwalker\Core\Form\AbstractFieldDefinition;
use Windwalker\Form\Filter\MaxLengthFilter;
use Windwalker\Form\Form;
use Windwalker\Validator\Rule;

/**
 * The {$controller.item.name.cap$}EditDefinition class.
 *
 * @since  1.0
 */
class EditDefinition extends AbstractFieldDefinition
{
    use PhoenixFieldTrait;

    /**
     * Define the form fields.
     *
     * @param Form $form The Windwalker form object.
     *
     * @return  void
     *
     * @throws \InvalidArgumentException
     */
    public function doDefine(Form $form)
    {
        // Basic fieldset
        $this->fieldset('basic', function (Form $form) {
            // ID
            $this->hidden('id');

            // Title
            $this->text('title')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.title'))
                ->addFilter('trim')
                ->maxlength(255)
                ->required(true);

            // Alias
            $this->text('alias')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.alias'))
                ->description(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.alias.desc'))
                ->maxlength(255);

            // Image
            $this->text('image')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.image'))
                ->maxlength(255);

            // URL
            $this->text('url')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.url'))
                ->maxlength(255)
                ->addValidator(Rule\UrlValidator::class)
                ->attr('data-validate', 'url');

            // Example: {$controller.item.name.cap$} List
            // TODO: Please remove this field in production
            $this->add('{$controller.item.name.lower$}_list', {$controller.item.name.cap$}ListField::class)
                ->label('List Example')
                ->option('- Select {$controller.item.name.cap$} Example -', '')
                ->addClass('has-select2');

            // Example: {$controller.item.name.cap$} Modal
            // TODO: Please remove this field in production
            $this->add('{$controller.item.name.lower$}_modal', {$controller.item.name.cap$}ModalField::class)
                ->label('Modal Example')
                ->set('placeholder', 'Select {$controller.item.name.cap$} Example');
        });

        // Text Fieldset
        $this->fieldset('text', function (Form $form) {
            // Introtext
            $this->textarea('introtext')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.introtext'))
                ->maxlength(static::TEXT_MAX_UTF8)
                ->rows(10);

            // Fulltext
            $this->textarea('fulltext')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.fulltext'))
                ->maxlength(static::TEXT_MAX_UTF8)
                ->rows(10);
        });

        // Created fieldset
        $this->fieldset('created', function (Form $form) {
            // State
            $this->switch('state')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.published'))
                ->class('')
                ->color('success')
                ->circle(true)
                ->defaultValue(1);

            // Created
            $this->calendar('created')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.created'))
                ->addFilter(UtcFilter::class);

            // Modified
            $this->calendar('modified')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.modified'))
                ->addFilter(UtcFilter::class)
                ->disabled();

            // Author
            $this->text('created_by')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.author'));

            // Modified User
            $this->text('modified_by')
                ->label(__('{$package.name.lower$}.{$controller.item.name.lower$}.field.modifiedby'))
                ->disabled();
        });
    }
}
