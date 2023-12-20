import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LinkModule } from "../link";
import { SharedModule } from "../shared";

import { SidebarComponent } from "./sidebar.component";
import { SidebarService } from "./sidebar.service";

export type LayoutVariant = "primary" | "secondary";

@Component({
  selector: "bit-layout",
  templateUrl: "layout.component.html",
  standalone: true,
  imports: [CommonModule, SharedModule, LinkModule, RouterModule, SidebarComponent],
})
export class LayoutComponent {
  protected mainContentId = "main-content";

  @Input() variant: LayoutVariant = "primary";

  constructor(protected sidebarService: SidebarService) {}

  protected handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.sidebarService.setClose();
      document.getElementById("bit-sidebar-toggle-button").focus();
      return false;
    }

    return true;
  };
  focusMainContent() {
    document.getElementById(this.mainContentId)?.focus();
  }
}
