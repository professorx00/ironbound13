import IronboundItemBase from './base-item.mjs';

export default class IronboundPotion extends IronboundItemBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    "IRONBOUND.Item.Potion",
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();
    schema.ap = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });

    schema.hasBoon = new fields.BooleanField({ initial: false });

    schema.equipped = new fields.BooleanField({ initial: false });

    schema.poolCost = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.poolCostType = new fields.StringField({ initial: "none" });

    schema.poolBonus = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.poolBonusType = new fields.StringField({ initial: "none" });

    schema.healingFormula = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.healingType = new fields.StringField({ initial: "none" });

    schema.damageFormula = new fields.NumberField({
      ...requiredInteger,
      initial: 0,
    });
    schema.damageType = new fields.StringField({ initial: "none" });

    return schema;
  }
}
