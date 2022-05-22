import { Plus } from "phosphor-react";
import { Popover } from "@headlessui/react";
import { WidgetForm } from "./WidgetForm";

export function Widget() {
  return (
    <Popover className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className="bg-white hover:bg-blue-50 text-brand-500 rounded-full px-3 h-16 flex items-center group border border-brand-500">
        <Plus className="w-10 h-10" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear text-lg whitespace-nowrap">
          <span className="pl-2"></span>Criar Lembrete
        </span>
      </Popover.Button>
    </Popover>
  );
}
