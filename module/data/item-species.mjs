import IronboundItemBase from './base-item.mjs';

export default class IronboundSpecies extends IronboundItemBase {
  static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    return schema;
  }
}
