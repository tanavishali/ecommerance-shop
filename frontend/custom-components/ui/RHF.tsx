"use client";

/**
 * RHF — React Hook Form controller wrappers.
 * Each component wires a custom UI component into RHF's Controller,
 * passing error messages through automatically.
 */

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { Toggle } from "./Toggle";

// ─── RHFInput ────────────────────────────────────────────────────────────────

interface RHFInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function RHFInput<T extends FieldValues>({
  name, control, label, placeholder, type = "text", hint, required, disabled, leftIcon, rightIcon,
}: RHFInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          label={label}
          type={type}
          placeholder={placeholder}
          hint={hint}
          required={required}
          disabled={disabled}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

// ─── RHFTextarea ─────────────────────────────────────────────────────────────

interface RHFTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function RHFTextarea<T extends FieldValues>({
  name, control, label, placeholder, hint, required, disabled, rows,
}: RHFTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Textarea
          {...field}
          label={label}
          placeholder={placeholder}
          hint={hint}
          required={required}
          disabled={disabled}
          rows={rows}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

// ─── RHFSelect ───────────────────────────────────────────────────────────────

interface RHFSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  disabled?: boolean;
}

export function RHFSelect<T extends FieldValues>({
  name, control, label, placeholder, options, required, disabled,
}: RHFSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          label={label}
          placeholder={placeholder}
          options={options}
          required={required}
          disabled={disabled}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

// ─── RHFCheckbox ─────────────────────────────────────────────────────────────

interface RHFCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function RHFCheckbox<T extends FieldValues>({
  name, control, label, description, disabled,
}: RHFCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          label={label}
          description={description}
          disabled={disabled}
          checked={!!field.value}
          onChange={(e) => field.onChange(e.target.checked)}
        />
      )}
    />
  );
}

// ─── RHFToggle ───────────────────────────────────────────────────────────────

interface RHFToggleProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
}

export function RHFToggle<T extends FieldValues>({
  name, control, label, disabled,
}: RHFToggleProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Toggle
          label={label}
          disabled={disabled}
          checked={!!field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
