import { NgModule } from "@angular/core";

import {
  MultiSelectModule,
  SearchModule,
  SelectModule,
  NoItemsModule,
} from "@bitwarden/components";
import { CoreOrganizationModule } from "@bitwarden/web-vault/app/admin-console/organizations/core";
import { DynamicAvatarComponent } from "@bitwarden/web-vault/app/components/dynamic-avatar.component";
import { ProductSwitcherModule } from "@bitwarden/web-vault/app/layouts/product-switcher/product-switcher.module";
import { HeaderComponent } from "@bitwarden/web-vault/app/layouts/web-header.component";
import { SharedModule } from "@bitwarden/web-vault/app/shared";

import { AccessPolicySelectorComponent } from "./access-policies/access-policy-selector/access-policy-selector.component";
import { AccessSelectorComponent } from "./access-policies/access-selector.component";
import { BulkConfirmationDialogComponent } from "./dialogs/bulk-confirmation-dialog.component";
import { BulkStatusDialogComponent } from "./dialogs/bulk-status-dialog.component";
import { NewMenuComponent } from "./new-menu.component";
import { OrgSuspendedComponent } from "./org-suspended.component";
import { ProjectsListComponent } from "./projects-list.component";
import { SecretsListComponent } from "./secrets-list.component";

@NgModule({
  imports: [
    SharedModule,
    ProductSwitcherModule,
    MultiSelectModule,
    CoreOrganizationModule,
    NoItemsModule,
    SelectModule,
    DynamicAvatarComponent,
    SearchModule,
    HeaderComponent,
  ],
  exports: [
    SharedModule,
    NoItemsModule,
    AccessSelectorComponent,
    AccessPolicySelectorComponent,
    BulkStatusDialogComponent,
    BulkConfirmationDialogComponent,
    NewMenuComponent,
    ProjectsListComponent,
    SearchModule,
    SecretsListComponent,
    SelectModule,
    SharedModule,
    HeaderComponent,
  ],
  declarations: [
    BulkStatusDialogComponent,
    BulkConfirmationDialogComponent,

    NewMenuComponent,
    ProjectsListComponent,
    SecretsListComponent,
    AccessSelectorComponent,
    OrgSuspendedComponent,
    AccessPolicySelectorComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class SecretsManagerSharedModule {}
