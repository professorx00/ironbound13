import IronboundItemBase from './base-item.mjs';

export default class IronboundFaction extends IronboundItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "IRONBOUND.Item.Faction",
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    const notes = new fields.HTMLField();

    return schema;
  }
}
