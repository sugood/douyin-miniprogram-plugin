
package com.sugood.ijplugin.tt_miniprogram.lang.ttss;

import com.intellij.lang.Language;
import com.intellij.openapi.fileTypes.LanguageFileType;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class WXSSLanguage extends Language {

    public static WXSSLanguage INSTANCE = new WXSSLanguage();

    private WXSSLanguage() {
        super("TTSS");
    }

    @NotNull
    @Override
    public String getDisplayName() {
        return super.getDisplayName();
    }

    @Nullable
    @Override
    public LanguageFileType getAssociatedFileType() {
        return TTSSFileType.INSTANCE;
    }
}
