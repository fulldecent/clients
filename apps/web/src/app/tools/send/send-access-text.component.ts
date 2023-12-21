import { Component, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { I18nService } from "@bitwarden/common/platform/abstractions/i18n.service";
import { PlatformUtilsService } from "@bitwarden/common/platform/abstractions/platform-utils.service";
import { SendAccessView } from "@bitwarden/common/tools/send/models/view/send-access.view";

import { SharedModule } from "../../shared";

@Component({
  selector: "app-send-access-text",
  templateUrl: "send-access-text.component.html",
  imports: [SharedModule],
  standalone: true,
})
export class SendAccessTextComponent {
  private _send: SendAccessView = null;
  protected showText = false;

  protected formGroup = this.formBuilder.group({
    sendText: [""],
  });

  constructor(
    private i18nService: I18nService,
    private platformUtilsService: PlatformUtilsService,
    private formBuilder: FormBuilder
  ) {}

  get send(): SendAccessView {
    return this._send;
  }

  @Input() set send(value: SendAccessView) {
    this._send = value;
    this.showText = this.send.text != null ? !this.send.text.hidden : true;

    if (this.send == null || this.send.text == null) {
      return;
    }

    this.formGroup.controls.sendText.patchValue(
      this.showText ? this.send.text.text : this.send.text.maskedText
    );
  }

  protected copyText() {
    this.platformUtilsService.copyToClipboard(this.send.text.text);
    this.platformUtilsService.showToast(
      "success",
      null,
      this.i18nService.t("valueCopied", this.i18nService.t("sendTypeText"))
    );
  }

  protected toggleText() {
    this.showText = !this.showText;
    this.formGroup.controls.sendText.patchValue(
      this.showText ? this.send.text.text : this.send.text.maskedText
    );
  }
}
