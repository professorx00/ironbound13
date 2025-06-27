import IronboundItemBase from './base-item.mjs';

export default class IronboundDef extends IronboundItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "IRONBOUND.Item.Def",
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.equipped = new fields.BooleanField({ initial: false });

    schema.poolBonus = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.poolBonusType = new fields.StringField({ initial: "none" });

    return schema;
  }
}
