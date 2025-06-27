import IronboundItemBase from './base-item.mjs';

export default class IronboundBBS extends IronboundItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "IRONBOUND.Item.BBS",
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.bbsType = new fields.SchemaField({
      value: new fields.StringField({ initial: "boon" }),
      list: new fields.SchemaField({
        boon: new fields.StringField({ initial: "boon" }),
        bane: new fields.StringField({ initial: "bane" }),
      })
    });

    return schema;
  }
}
