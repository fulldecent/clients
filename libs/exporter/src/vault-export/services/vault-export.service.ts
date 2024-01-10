import { Utils } from "@bitwarden/common/platform/misc/utils";

import { IndividualVaultExportServiceAbstraction } from "./individual-vault-export.service.abstraction";
import { OrganizationVaultExportServiceAbstraction } from "./org-vault-export.service.abstraction";
import { ExportFormat, VaultExportServiceAbstraction } from "./vault-export.service.abstraction";

export class VaultExportService implements VaultExportServiceAbstraction {
  constructor(
    private individualVaultExportService: IndividualVaultExportServiceAbstraction,
    private organizationVaultExportService: OrganizationVaultExportServiceAbstraction,
  ) {}

  async getExport(format: ExportFormat = "csv", password: string): Promise<string> {
    if (!Utils.isNullOrWhitespace(password)) {
      if (format == "csv") {
        throw new Error("CSV does not support password protected export");
      }

      return this.individualVaultExportService.getPasswordProtectedExport(password);
    }
    return this.individualVaultExportService.getExport(format);
  }

  async getOrganizationExport(
    organizationId: string,
    format: ExportFormat,
    password: string,
  ): Promise<string> {
    if (!Utils.isNullOrWhitespace(password)) {
      if (format == "csv") {
        throw new Error("CSV does not support password protected export");
      }

      return this.organizationVaultExportService.getPasswordProtectedExport(
        password,
        organizationId,
      );
    }

    return this.organizationVaultExportService.getOrganizationExport(organizationId, format);
  }

  getFileName(prefix?: string, extension?: string): string {
    return this.individualVaultExportService.getFileName(prefix, extension);
  }
}
